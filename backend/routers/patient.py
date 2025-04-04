from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
import json

from type_def.patient import PatientCreate, PatientUpdate, PatientResponse
from auth.auth_handler import get_current_active_user_jwt as get_current_active_user
from auth.auth_bearer import JWTBearer
from auth.auth_handler import User
from db.psql_connector import DB, default_config

router = APIRouter(
    prefix="/patients",
    tags=["patients"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(JWTBearer())]
)

def get_db():
    params = default_config()
    db = DB(params)
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
def create_patient(
    patient: PatientCreate, 
    db: DB = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    query = """
        INSERT INTO patient_records (
            first_name, last_name, date_of_birth, gender, contact_number,
            email, address, medical_history, symptoms, diagnosis,
            treatment_plan, test_results, notes
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    """
    values = (
        patient.first_name, patient.last_name, patient.date_of_birth,
        patient.gender, patient.contact_number, patient.email,
        patient.address, patient.medical_history, patient.symptoms,
        patient.diagnosis, patient.treatment_plan, patient.test_results,
        patient.notes
    )
    
    db.exec(query, values)
    result = db.fetchone()
    db.commit()
    return result

@router.get("/", response_model=List[PatientResponse])
def get_patients(
    skip: int = 0, 
    limit: int = 100, 
    db: DB = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    query = "SELECT * FROM patient_records ORDER BY id LIMIT %s OFFSET %s"
    db.exec(query, (limit, skip))
    patients = db.fetchall()
    return patients

@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient(
    patient_id: int, 
    db: DB = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    query = "SELECT * FROM patient_records WHERE id = %s"
    db.exec(query, (patient_id,))
    patient = db.fetchone()
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.put("/{patient_id}", response_model=PatientResponse)
def update_patient(
    patient_id: int, 
    patient: PatientUpdate, 
    db: DB = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # First check if patient exists
    query = "SELECT * FROM patient_records WHERE id = %s"
    db.exec(query, (patient_id,))
    if db.fetchone() is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Build update query dynamically based on provided fields
    update_data = patient.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    set_clauses = []
    values = []
    for key, value in update_data.items():
        set_clauses.append(f"{key} = %s")
        values.append(value)
    values.append(patient_id)
    
    query = f"""
        UPDATE patient_records 
        SET {', '.join(set_clauses)}
        WHERE id = %s
        RETURNING *
    """
    
    db.exec(query, values)
    result = db.fetchone()
    db.commit()
    return result

@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(
    patient_id: int, 
    db: DB = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    query = "DELETE FROM patient_records WHERE id = %s RETURNING id"
    db.exec(query, (patient_id,))
    if db.fetchone() is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    db.commit()
    return None 
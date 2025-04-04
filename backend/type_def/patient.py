from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    contact_number: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    medical_history: Optional[str] = None
    symptoms: Optional[str] = None
    diagnosis: Optional[str] = None
    treatment_plan: Optional[str] = None
    test_results: Optional[str] = None
    notes: Optional[str] = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class PatientInDB(PatientBase):
    id: int
    diagnosis_ts: Optional[datetime] = None
    created_ts: datetime
    updated_ts: datetime

    class Config:
        from_attributes = True

class PatientResponse(PatientInDB):
    pass 
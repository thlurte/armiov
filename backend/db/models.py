from sqlalchemy import Column, Integer, String, Text, Date, DateTime
from sqlalchemy.sql import func
from .database import Base

class PatientRecord(Base):
    __tablename__ = "patient_records"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(String(50), nullable=True)
    contact_number = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    address = Column(Text, nullable=True)
    medical_history = Column(Text, nullable=True)
    symptoms = Column(Text, nullable=True)
    diagnosis = Column(Text, nullable=True)
    treatment_plan = Column(Text, nullable=True)
    test_results = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    diagnosis_ts = Column(DateTime, nullable=True)
    created_ts = Column(DateTime, server_default=func.now())
    updated_ts = Column(DateTime, server_default=func.now(), onupdate=func.now()) 
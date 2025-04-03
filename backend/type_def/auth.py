from pydantic import BaseModel
from typing import Union, Optional
from datetime import datetime
from typing import Union


class RegisterUserModel(BaseModel):
    id: Union[str, None] = None
    first_name: str
    last_name: str
    password: str
    email: str
    tel: Union[str, None] = None
    created_ts: Union[datetime, None] = None
    updated_ts: Union[datetime, None] = None
    last_login_ts: datetime | None = None


class LoginUserModel(BaseModel):
    email: str
    password: str


class AutheticatedAWSUsers(BaseModel):
    type: str
    aws_access_key_id: str
    aws_secret_access_key: str
    bucket_name: str

class PayhereAuthorizationModel(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    address: str
    city: str
    country: str
    items: str
    order_id: str
    amount: str
    currency: str = 'LKR'
    merchant_id: str = "1227333"
    recurrence: str = "1 Month"
    duration: str = "Forever"
    return_url: str = "https://theaisle.raccoon-ai.io/"
    cancel_url: str = "https://theaisle.raccoon-ai.io/api/v1/payhere/cancel"
    notify_url: str = "https://theaisle.racoon-ai.io/api/v1/payhere/notify"
    
class PayhereNotifyModel(BaseModel):
    merchant_id: str
    order_id: str
    payhere_amount: str
    payhere_currency: str
    status_code: str
    md5sig: str
    
class DeleteAPI(BaseModel):
    api_key: str
    
class PayhereCancelModel(BaseModel):
    merchant_id: str
    order_id: str
    payhere_amount: str
    payhere_currency: str
    status_code: str
    md5sig: str

class UserModel(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    tel: Union[str, None] = None
    is_super_admin: bool = False
    disabled: bool = False
    created_ts: Union[datetime, None] = None
    updated_ts: Union[datetime, None] = None
    last_login_ts: Union[datetime, None] = None


class ChangePasswordModel(BaseModel):
    new_password: str
    curr_password: str | None = None

class ChangeUserDetailsModel(BaseModel):
    new_first_name: str
    new_last_name: str 
    phone_number: str

class ChangeUserDetailsAdminModel(BaseModel):
    user_id: str
    new_first_name: str
    new_last_name: str 
    phone_number: str

class ChangeTierDetailsModel(BaseModel):
    tier:str
class User:
    id: str
    first_name: str
    last_name: str
    password: str
    email: str
    is_super_admin: bool = False
    disabled: bool = False
    email_verified: bool = False
    tel_verified: bool = False
    tel: Union[str, None] = None
    company: Union[str, None] = None
    company_id_number: Union[str, None] = None
    company_id_url: Union[str, None] = None
    created_ts: Union[datetime, None] = None
    updated_ts: Union[datetime, None] = None
    last_login_ts: Union[datetime, None] = None

    def __init__(
        self,
        id: str,
        first_name: str,
        last_name: str,
        password: str,
        email: str,
        is_super_admin: bool,
        disabled: bool,
        email_verified: bool,
        tel_verified: bool,
        tel: Union[str, None] = None,
        company: Union[str, None] = None,
        company_id_number: Union[str, None] = None,
        company_id_url: Union[str, None] = None,
        created_ts: Union[datetime, None] = None,
        updated_ts: Union[datetime, None] = None,
        last_login_ts: Union[datetime, None] = None,
    ):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.is_super_admin = is_super_admin
        self.disabled = disabled
        self.password = password
        self.email_verified = email_verified
        self.tel_verified = tel_verified
        self.tel = tel
        self.company = company
        self.company_id_number = company_id_number
        self.company_id_url = company_id_url
        self.created_ts = created_ts
        self.updated_ts = updated_ts
        self.last_login_ts = last_login_ts

    def pub(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "is_super_admin": self.is_super_admin,
            "disabled": self.disabled,
            "email_verified": self.email_verified,
            "tel_verified": self.tel_verified,
            "tel": self.tel,
            "company": self.company,
            "company_id_number": self.company_id_number,
            "company_id_url": self.company_id_url,
            "created_ts": self.created_ts,
            "updated_ts": self.updated_ts,
            "last_login_ts": self.last_login_ts,
        }

    def pvt(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "password": self.password,
            "email": self.email,
            "is_super_admin": self.is_super_admin,
            "email_verified": self.email_verified,
            "disabled": self.disabled,
            "tel": self.tel,
            "company": self.company,
            "company_id_number": self.company_id_number,
            "company_id_url": self.company_id_url,
            "created_ts": self.created_ts,
            "updated_ts": self.updated_ts,
            "last_login_ts": self.last_login_ts,
        }

class APIKeyReq(BaseModel):
    name: str
    expire_in: float
    allowed_origins: Optional[list] = None
    scope: Optional[dict] = None
    
class UserAPIKey(BaseModel):
    api_key: str

class AuthError:
    def __init__(self, message):
        self.message = message

    def response(self):
        return {
            "success": False,
            "msg": self.message,
            "result": None,
        }

class AuthSuccess:
    def __init__(self, message, result):
        self.message = message
        self.result = result

    def response(self):
        return {
            "success": True,
            "msg": self.message,
            "result": self.result,
        }

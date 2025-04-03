from fastapi import APIRouter, HTTPException, Depends, Response, status
from time import time

# Auth

from auth.auth_handler import (
    AuthHandler,
    LoginUserModel,
    RegisterUserModel,
    get_current_active_user_jwt as get_current_active_user,
    User,
)
from auth.auth_bearer import JWTBearer
from auth.api_key_handler import APIKeyManager

# Database
import psycopg2
from psycopg2 import DatabaseError
from db.psql_connector import DB, default_config

# Types
from type_def.common import Error, Success
from type_def.auth import (
    ChangePasswordModel,
    ChangeUserDetailsModel,
    ChangeTierDetailsModel,
    APIKeyReq,
    DeleteAPI,
    UserAPIKey,
)

# API V1
router = APIRouter()

@router.post("/api/auth/login", tags=["auth"])
async def login(login_model: LoginUserModel):
    start_time = time()
    res = await AuthHandler().login(login_model)
    print(res.response()["success"])
    if res.response()["success"] == True:
        print(res.response()["result"]["user"]["id"])
        user_id = res.response()["result"]["user"]["id"]
        try:
            pass
        except Exception as e:  # Exception handling for starting scheduler
            # Handle potential errors and log them
            print(f"Error starting scheduler for user {user_id}: {e}")
    
    end_time = time()
    duration = end_time - start_time
    return res.response()


@router.post("/api/auth/register", tags=["auth"])
async def register(register_model: RegisterUserModel):
    res = await AuthHandler().register(register_model)
    return res.response()


@router.get("/api/auth/users/me", tags=["auth"], dependencies=[Depends(JWTBearer())])
async def read_users_me(
    response: Response,
    current_user: User = Depends(get_current_active_user),
):
    return (
        Success("Successfull", status.HTTP_200_OK, current_user.pub()).resp(response)
        if current_user
        else Error("User not found", 4004, 404).resp(response)
    )

@router.get("/api/auth/logout", tags=["auth"], dependencies=[Depends(JWTBearer())])
async def logout(current_user: User = Depends(get_current_active_user)):
    return {"msg": "Logout"}


@router.post(
    "/api/auth/change-password/",
    tags=["auth"],
    dependencies=[Depends(JWTBearer())],
)
async def change_password(
    body: ChangePasswordModel,
    current_user: User = Depends(get_current_active_user),
):
    return (
        await AuthHandler(current_user).change_password(
            current_user.id, body.new_password, body.curr_password
        )
    ).response()


@router.get("/api/auth/delete/{user_id}", dependencies=[Depends(JWTBearer())])
async def delete_user(
    response: Response,
    user_id: str,
    current_user: User | None = Depends(get_current_active_user),
):
    if await AuthHandler(current_user).delete_user(user_id):
        return Success("User deleted successfully", status.HTTP_200_OK, {}).resp(
            response
        )
    else:
        return Error(
            "Something went wrong, while deleting user",
            4005,
            status.HTTP_400_BAD_REQUEST,
        ).resp(response)


# Endpoint to rename a user
@router.post("/api/users/rename", dependencies=[Depends(JWTBearer())])
async def rename_user(
    response: Response,
    body: ChangeUserDetailsModel,
    current_user: User = Depends(get_current_active_user),
):
    try:
        # 1. Input Validation
        if not body.new_first_name or not body.new_last_name:
            raise HTTPException(
                status_code=400, detail="First and last name cannot be empty"
            )
        # ... Additional validation for name formats if needed

        # 2. Database Interaction: Update the names
        db = DB(default_config())
        db.exec(
            "UPDATE users SET first_name = %s, last_name = %s, tel=%s WHERE id = %s;",
            (
                body.new_first_name,
                body.new_last_name,
                body.phone_number,
                current_user.id,
            ),
        )
        db.commit()

        return {"message": "First and last name updated successfully"}

    except DatabaseError as e:
        raise HTTPException(status_code=500, detail="Database error")


# POST Endpoint - Assign Tier to User
@router.post("/api/v1/users/set-tier", dependencies=[Depends(JWTBearer())])
async def set_user_tier(
    response: Response,
    body: ChangeTierDetailsModel,
    current_user: User = Depends(get_current_active_user),  # Assuming authorization
):
    if body.tier not in ["Sparkly", "Luminary", "Oracle","Ethereal"]:
        raise HTTPException(status_code=400, detail="Invalid tier")

    try:
        db = DB(default_config())
        db.exec(
            """
            INSERT INTO user_tier (user_id, tier) 
            VALUES (%s, %s)
            ON CONFLICT (user_id) DO UPDATE SET tier = %s; 
            """,
            (current_user.id, body.tier, body.tier),
        )
        db.commit()
        return Success(
            "Tier assigned successfully", status.HTTP_200_OK, {"tier": body.tier}
        )

    except DatabaseError as e:
        raise HTTPException(status_code=500, detail="Database error")


# GET Endpoint - Retrieve User's Tier
@router.get("/api/v1/users/get-tier", dependencies=[Depends(JWTBearer())])
async def get_user_tier(
    response: Response,
    current_user: User = Depends(get_current_active_user),  # Assuming authorization
):
    try:
        db = DB(default_config())
        db.exec("SELECT tier FROM user_tier WHERE user_id = %s", (current_user.id,))
        result = db.fetchone()

        if result:
            return Success("Tier retrieved", status.HTTP_200_OK, {"tier": result})
        else:
            return Success("Tier not selected", status.HTTP_200_OK, {"tier": "false"})

    except DatabaseError as e:
        raise HTTPException(status_code=500, detail="Database error")

# Get Remaining Tokens
@router.get("/api/v1/users/tokencost", dependencies=[Depends(JWTBearer())])
async def get_token_cost(
    response: Response,
    current_user: User = Depends(get_current_active_user),
):
    try:
        db = DB(default_config())
        db.exec("SELECT token_cost FROM token_cost_usage WHERE user_id = %s", (current_user.id,))
        result = db.fetchone()

        if result:
            return Success("Remaining Tokens Retrieved", status.HTTP_200_OK, result)
        else:
            return Success("Token Count not available", status.HTTP_200_OK, result)
    
    except DatabaseError as e:
        raise HTTPException(status_code=500, detail="Database error")
    
# Get Value in Money
@router.get("/api/v1/users/usagecost", dependencies=[Depends(JWTBearer())])
async def get_usage_cost(
    response: Response,
    current_user: User = Depends(get_current_active_user),
):
    try:
        db = DB(default_config())
        db.exec("SELECT usage_cost FROM token_cost_usage WHERE user_id = %s", (current_user.id,))
        result = db.fetchone()

        if result:
            return Success("Usage Cost Retrieved", status.HTTP_200_OK, result)
        else:
            return Success("Usage Cost not available", status.HTTP_200_OK, result)
    
    except DatabaseError as e:
        raise HTTPException(status_code=500, detail="Database error")

@router.get(
    "/api/auth/list/", tags=["auth"], dependencies=[Depends(JWTBearer())]
)  # Enforce type checking
async def list_all_users(current_user: User = Depends(get_current_active_user)):
    """
    Lists all registered users. This endpoint requires super admin privileges.
    """

    auth_handler = AuthHandler(user=current_user)  # Instantiate within endpoint
    result = await auth_handler.get_all_users()

    if isinstance(result, list):
        return result  # Return the list of users directly
    else:
        raise HTTPException(
            status_code=400, detail=result.message
        )  # Handle AuthError gracefully


@router.post("/api/auth/token/new", tags=["auth"], dependencies=[Depends(JWTBearer())])
async def new_api_token(
    response: Response, body: APIKeyReq, user: User = Depends(get_current_active_user)
):
    return APIKeyManager(user).issue_new(body).resp(response)


@router.post("/api/auth/token/api/check/{api_key}", tags=["auth"])
async def check_api_token(api_key: str, scope: str = None):
    origin = None
    valid = APIKeyManager().safe_check(api_key, scope=scope, origin=origin)
    if valid:
        return Success("Validation passed", 200, {})
    return Error("Validation failed", 401, 4001)


@router.delete(
    "/api/auth/token/api/delete",
    tags=["auth"],
    dependencies=[Depends(JWTBearer())],
)
async def delete_api_token(response: Response, body: DeleteAPI, user: User = Depends(get_current_active_user)):
    return APIKeyManager(user).delete(body.api_key)


@router.get("/api/v1/users/list", tags=["auth"], dependencies=[Depends(JWTBearer())])
async def list_api_token(
    response: Response, user: User = Depends(get_current_active_user)
):
    return APIKeyManager(user).get_my_token_list().resp(response)

# GET Endpoint - Retrieve User's Payment Information
@router.get("/api/v1/users/payment", dependencies=[Depends(JWTBearer())])
async def get_payment_information(
    response: Response,
    current_user: User = Depends(get_current_active_user), 
):
    try:
        db = DB(default_config())
        db.exec("SELECT * FROM payments WHERE user_id = %s", (current_user.id,))
        result = db.fetchone()

        if result:
            return Success("Information retrieved", status.HTTP_200_OK, {result})
        else:
            return Success("No records found", status.HTTP_200_OK, {result})

    except DatabaseError as e:
        raise HTTPException(status_code=500, detail="Database error")
    
@router.post("/api/v1/users/api-key", dependencies=[Depends(JWTBearer())])
async def store_user_api_key(
    response: Response,
    body: UserAPIKey,
    current_user: User = Depends(get_current_active_user),  
):
    try:
        db = DB(default_config())
        # UPSERT operation: INSERT or UPDATE if conflict occurs
        db.exec(
            """
            INSERT INTO user_api_keys (user_id, api_key)
            VALUES (%s, %s)
            ON CONFLICT (user_id, api_key)
            DO UPDATE SET api_key = EXCLUDED.api_key
            """,
            (current_user.id, body.api_key)
        )
        db.commit()

        return {"message": "Successfully stored or updated"}
    
    except DatabaseError as e:
        raise HTTPException(status_code=500, detail="Database error")
    
# GET Endpoint - Retrieve User's API Key Information
@router.get("/api/v1/users/api-key", dependencies=[Depends(JWTBearer())])
async def get_payment_information(
    response: Response,
    current_user: User = Depends(get_current_active_user),  
):
    try:
        db = DB(default_config())
        db.exec("SELECT * FROM user_api_keys WHERE user_id = %s", (current_user.id,))
        result = db.fetchone()

        if result:
            return Success("Information retrieved", status.HTTP_200_OK, result)
        else:
            return Success("No records found", status.HTTP_200_OK, result)

    except DatabaseError as e:
        raise HTTPException(status_code=500, detail="Database error")
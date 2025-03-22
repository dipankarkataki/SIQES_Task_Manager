<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    use ApiResponse;

    public function login(Request $request){
        $validate = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validate->fails()){
            return $this->errorResponse('Validation error: '.$validate->errors()->first(), 400);
        }else{
            try{
                $user = User::where(['email' => $request->email, 'role' => 'admin'])->first();
                if(!$user || !Hash::check($request->password, $user->password)){
                    return $this->errorResponse('Invalid credentials', 401);
                }else{
                    $token = $user->createToken($request->email);
                    return $this->successResponse('Login successful', $user, $token->plainTextToken);
                }
            }catch(\Exception $e){
                Log::error('Failed to login: '.$e->getMessage());
                return $this->errorResponse('Failed to login', 500);
                
            }
        }

    }


    public function createUser(Request $request){
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role' => 'required',
        ]);

        if($validate->fails()){
            return $this->errorResponse('Validation error '.$validate->errors()->first(), 400);
        }else{
            try{
                $create = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'role' => $request->role,
                ]);
                return $this->successResponse('User created successfully', $create, null, 201);
            }catch(\Exception $e){
                Log::error('Failed to create user: '.$e->getMessage());
                return $this->errorResponse('Failed to create user', 500);
            }
        }
    }

    public function getUsers(){
        try{
            $users = User::all();
            return $this->successResponse('Users found', $users, null, 200);
        }catch(\Exception $e){
            Log::error('Failed to get users: '.$e->getMessage());
            return $this->errorResponse('Failed to get users', 500);
        }
    }

    public function getUserById($id){
        try{
            $user = User::find($id);
            if(!$user){
                return $this->errorResponse('User not found', 404);
            }else{
                return $this->successResponse('User found', $user, null, 200);
            }
        }catch(\Exception $e){
            Log::error('Failed to get user: '.$e->getMessage());
            return $this->errorResponse('Failed to get user', 500);
        }
    }

    public function updateUser(Request $request, $id){
        $validate = Validator::make($request->all(), [
            'email' => 'email|unique:users',
        ]);

        if($validate->fails()){
            return $this->errorResponse('Validation error '.$validate->errors()->first(), 400);
        }else{
            try{
                
                $user = User::find($id);
                if(!$user){
                    return $this->errorResponse('User not found', 404);
                }else{
                    User::where('id', $id)->update([
                        'name' => $request->name ?? $user->name,
                        'email' => $request->email ?? $user->email,
                        'password' => Hash::make($request->password) ?? $user->password,
                        'role' => $request->role ?? $user->role,
                    ]);
                    return $this->successResponse('User updated successfully', null, null, 200);
                }
            }catch(\Exception $e){
                Log::error('Failed to update user: '.$e->getMessage());
                return $this->errorResponse('Failed to update user', 500);
            }
        }
    }

    public function deleteUser(Request $request, $id){
        try{
            $user = User::find($id);
            if(!$user){
                return $this->errorResponse('User not found', 404);
            }else{
                $user->delete();
                return $this->successResponse('User deleted successfully', null, null, 200);
            }
        }catch(\Exception $e){
            Log::error('Failed to delete user: '.$e->getMessage());
            return $this->errorResponse('Failed to delete user', 500);
        }
    }

    public function logout(){
        try{
            auth()->user()->tokens()->delete();
            return $this->successResponse('Logout successful', null, null, 200);
        }catch(\Exception $e){
            Log::error('Failed to logout: '.$e->getMessage());
            return $this->errorResponse('Failed to logout', 500);
        }
    }
}

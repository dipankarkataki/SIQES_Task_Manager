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
                $user = User::where('email', $request->email)->first();
                if(!$user || !Hash::check($request->password, $user->password)){
                    return $this->errorResponse('Invalid credentials', 401);
                }else{
                    $token = $user->createToken($request->email);
                    return $this->successResponse('Login successful', $user, $token->plainTextToken);
                }
            }catch(\Exception $e){
                return $this->errorResponse('Failed to login', 500);
                Log::error('Failed to login: '.$e->getMessage());
            }
        }

    }


    public function createUser(Request $request){
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validate->fails()){
            return $this->errorResponse('Validation error '.$validate->errors()->first(), 400);
        }else{
            try{
                $create = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);
                return $this->successResponse('User created successfully', $create, 201);
            }catch(\Exception $e){
                return $this->errorResponse('Failed to create user', 500);
                Log::error('Failed to create user: '.$e->getMessage());
            }
        }
    }

    public function logout(){
        try{
            auth()->user()->tokens()->delete();
            return $this->successResponse('Logout successful', null, null, 200);
        }catch(\Exception $e){
            return $this->errorResponse('Failed to logout', 500);
            Log::error('Failed to logout: '.$e->getMessage());
        }
    }
}

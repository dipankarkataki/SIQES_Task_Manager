<?php

namespace App\Http\Controllers\MobileApp;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
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
                $user = User::where(['email' => $request->email, 'role' => 'user'])->first();
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
}

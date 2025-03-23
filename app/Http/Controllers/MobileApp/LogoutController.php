<?php

namespace App\Http\Controllers\MobileApp;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    use ApiResponse;
    
    public function logout(){
        try{
            auth()->user()->tokens()->delete();
            return $this->successResponse('Logged out successfully', null, null, 200);
        }catch(\Exception $e){
            Log::error('Error in Logout Controller: '. $e->getMessage());
            return $this->errorResponse('Something went wrong', 500);
        }
    }
}

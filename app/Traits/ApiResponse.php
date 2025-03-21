<?php

namespace App\Traits;

trait ApiResponse
{
    /**
     * @param string $message
     * @param mixed $data
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function successResponse(string $message, $data, string $token = null, int $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'token' => $token,
            'http_code' => $code
        ]);
    }

    /**
     * @param string $message
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function errorResponse(string $message, int $code)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'http_code' => $code
        ]);
    }
}
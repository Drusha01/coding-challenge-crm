<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;

Route::get('/',function(){
    return redirect()->route('customer-page');
});
Route::get('/customer', [CustomerController::class, 'index'])->name('customer-page');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard-page');
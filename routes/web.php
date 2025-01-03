<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;

Route::get('/',function(){
    return redirect()->route('dashboard-page');
});

Route::prefix('customer')->group(function () {
    Route::get('/', [CustomerController::class, 'index'])->name('customer-page');
});
Route::prefix('api')->group(function () {
    Route::prefix('customer')->group(function () {
        Route::get("/view/{id}",[CustomerController::class, 'view'])->name('customer-view');
        Route::post("/all",[CustomerController::class, 'all'])->name('customer-all');
        Route::post("/add",[CustomerController::class, 'add'])->name('customer-add');
        Route::post("/edit",[CustomerController::class, 'edit'])->name('customer-edit');
        Route::post("/delete",[CustomerController::class, 'delete'])->name('customer-delete');
    });
});
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard-page');
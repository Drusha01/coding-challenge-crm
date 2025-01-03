<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Customers;
class CustomerController extends Controller
{
    public function index(Request $request){
        return Inertia::render("Customer/Customer",[
        ]);
    }

    public function all(Request $request){
        $rows = $request->input('rows');
        $search = $request->input('search');
        $page = $request->input('page');
        if(!isset($page)){
            $page = 1;
        }
        if($rows > 100){
            $rows = 100;
        }
        $customers = Customers::when($search, function($query, $search) {
            return $query->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        })
        ->offset(($page - 1) * $rows)  
        ->limit($rows) 
        ->get();
        $total = Customers::when($search, function($query, $search) {
            return $query->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        })
        ->count(); 
        return response()->json([
            'data' => $customers,
            'total' =>$total,
            'page' =>$page,
            'rows'=>$rows,
            'search'=>$search
        ], 200);
    }

    public function view(Request $request,$id){
        $customer = Customers::find($id);
        if (!$customer) {
            return response()->json([
                'error' => 'Customer not found'
            ], 404);
        }
        return response()->json([
            'customer' => json_encode($customer)
        ], 200);
    }

    public function add(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'contact_number' => 'min:0|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $customer = new Customers();
        $customer->first_name = $request->input('first_name');
        $customer->last_name = $request->input('last_name');
        $customer->email = $request->input('email');
        $customer->contact_number = $request->input('contact_number');
        if($customer->save()){
            return 1;
        }
    }

    public function edit(Request $request){
        $id =  $request->input('id');
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,' . $id,
            'contact_number' => 'required|string|max:15',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }
        $customer = Customers::find($id);
        if (!$customer) {
            return response()->json([
                'error' => 'Customer not found!'
            ], 422);
        }
        $customer->first_name = $request->input('first_name');
        $customer->last_name = $request->input('last_name');
        $customer->email = $request->input('email');
        $customer->contact_number = $request->input('contact_number');
        if($customer->save()){
            return 1;
        }
    }
    public function delete(Request $request){
        $id =  $request->input('id');
        $customer = Customers::find($id);
        if ($customer) {
            $customer->delete();
            return 1;
        } else {
            return response()->json(['message' => 'Customer not found'], 404);
        }
    }
}

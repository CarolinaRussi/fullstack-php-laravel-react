<?php

namespace App\Http\Controllers;

use App\Services\SolicitationService;
use Illuminate\Http\Request;
use App\Enums\SolicitationStatus;
use Illuminate\Validation\Rules\Enum;

class SolicitationController extends Controller
{
    protected $solicitationService;

    public function __construct(SolicitationService $solicitationService)
    {
        $this->solicitationService = $solicitationService;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' =>  ['nullable', new Enum(SolicitationStatus::class)],
        ]);

        $data['user_id'] = $request->user()->id;

        $solicitation = $this->solicitationService->createSolicitation($data);

        return response()->json($solicitation, 201);
    }

    public function show($id)
    {
        $solicitation = $this->solicitationService->getSolicitationById($id);

        if (! $solicitation) {
            return response()->json(['message' => 'Solicitation not found'], 404);
        }

        return response()->json($solicitation);
    }

    public function myRequests(Request $request)
    {
        $userId = $request->user()->id;

        $solicitations = $this->solicitationService->getSolicitationsByUserId($userId);

        return response()->json($solicitations);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'type' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => ['nullable', new Enum(SolicitationStatus::class)],
            'response' => 'nullable|string',
        ]);

        $solicitation = $this->solicitationService->updateSolicitation($id, $data);

        return response()->json($solicitation);
    }

    public function destroy($id)
    {
        $deleted = $this->solicitationService->deleteSolicitation($id);

        return response()->json(['deleted' => $deleted]);
    }
}

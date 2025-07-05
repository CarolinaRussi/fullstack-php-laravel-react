<?php

namespace App\Enums;

enum SolicitationStatus: string
{
    case Pending = 'pending';
    case InReview = 'in_review';
    case Completed = 'completed';
    case Canceled = 'canceled';
}

<?php

namespace App\Enums\Traits;

trait EnumToArray
{
    public static function keys(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function array(): array
    {
        return array_combine(self::values(), self::keys());
    }
}

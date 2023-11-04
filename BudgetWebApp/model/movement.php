<?php
// Creo una classe che descriva il movimento
class Movement
{
    public int $id;
    public float $value;
    public string $description;
    public string $date;
    public int $type;
    public int $wallet;

    public function __construct(int $id, float $value, string $description, string $date, int $type, int $wallet) {
        $this->id = $id;
        $this->value = $value;
        $this->description = $description;
        $this->date = $date;
        $this->type = $type;
        $this->wallet = $wallet;
    }

    public function get_id() {
        return $this->id;
    }

    public function get_value() {
        return $this->value;
    }

    public function get_description() {
        return $this->description;
    }

    public function get_date() {
        return $this->date;
    }

    public function get_type() {
        return $this->type;
    }

    public function get_wallet() {
        return $this->wallet;
    }
}
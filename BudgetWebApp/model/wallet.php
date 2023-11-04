<?php
// Creo una classe che descriva il wallet
class Wallet
{
    public int $id;
    public string $name;
    public float $amount;
    public bool $visibility;

    public function __construct(int $id, string $name, float $amount, bool $visibility) {
        $this->id = $id;
        $this->name = $name;
        $this->amount = $amount;
        $this->visibility = $visibility;
    }

    public function get_id() {
        return $this->id;
    }

    public function get_name() {
        return $this->name;
    }

    public function get_amount() {
        return $this->amount;
    }

    public function get_visibility() {
        return $this->visibility;
    }
}
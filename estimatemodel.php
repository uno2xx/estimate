<?php 

class EstimateModel {

	private $db;
	private $table;

	public function __construct() {
		global $wpdb;
		$this->db = $wpdb;
		$this->table = $this->db->prefix . "estimate_categories";
	}

	public function insert(array $data) {
		$this->db->insert($this->table, array(
			'category_name'	=> (string) $data['category_name'],
			'low'			=> (int) $data['low'],
			'high'			=> (int) $data['high'],
		));

		return $this->db->insert_id;
	}

	public function list() {
		return $this->db->get_results("SELECT * FROM $this->table ", ARRAY_A);
	}

}

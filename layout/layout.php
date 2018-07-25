<?php

class EstimateAdminLayout {


	public $html;
	public $data;

	public function __construct() {

	}

	public function adminLayout($data) {
		$this->data = $data;
	 	$this->addHeader();
	 	$this->row();
	 	$this->output();
	}

	private function addHeader() {
		$this->html .= '<h1>Estimate</h1>';
	}

	private function row() {
		$this->html .= '
			<div class="estimate-row">
				<div class="estimate-left">' . $this->addTable() . '</div>
				<div class="estimate-right">' . $this->form() . '</div>
				<div class="cleafix"></div>
			</div>
		';
	}

	private function addTable() : string {
		$table = '
			<div class="estimate-table-container">
			<table class="estimate-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Category Name</th>
						<th>Low</th>
						<th>High</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
				'. $this->loadData() .'
				</tbody>
			</table>
			</div>
		';

		return $table;
	}

	private function form() : string {
		$form = '
			<div class="estimate-form">
			<h4><span>Add</span> Category</h4>
			<p>
			<label for="categoryName">Category Name</label>
			<input type="text" id="categoryName">
			</p>
			<p>
			<label for="categoryLow">Low %</label>
			<input type="text" id="categoryLow">
			</p>
			<p>
			<label for="categoryHigh">High %</label>
			<input type="text" id="categoryHigh">
			</p>
			<p><button class="estimate-button"><span>Save</span> Category</button></p>
			</div>
		';

		return $form;
	}

	private function output() {
		echo $this->html;
	}

	private function loadData() : string {
		$html = '';
		foreach ($this->data as $data) {
			$html .= '
				<tr>
					<td>'.$data['id'].'</td>
					<td class="text-left">'.$data['category_name'].'</td>
					<td>'.$data['low'].'%</td>
					<td>'.$data['high'].'%</td>
					<td><button class="estimate-edit" data-id="'.$data['id'].'">edit</button></td>
				</tr>
			';
		}

		return $html;
	}

}
<?php 

class ExternalLayoutView {

	public $title;

	public function __construct(string $title) {
		$this->title = $title;
		self::renderLayout();
	}

	public function renderLayout() { ?>
		<div id="mileaseSimulator">
			<div class="card">
				<h2>Lease Expiry Dashboard</h2>
				<div class="milease-form">
					<div class="milease-form-group">
						<label><i class="fas fa-calendar-alt"></i></label>
						<input type="text" class="milease-calender">
					</div>
					<div class="milease-divider"></div>
					<h4><span id="gauge-value">0</span> Months</h4>
					<canvas id="canvas-preview"></canvas>
				</div>

			</div>

		</div>


	<?php

	}

}
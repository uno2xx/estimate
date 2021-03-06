<?php 

class ExternalLayoutView {

	public $title;
	public $categories;

	public function __construct($title, $categories) {
		$this->title = $title;
		$this->categories = $categories;
		self::renderLayout();
	}

	public function renderLayout() { ?>
		<div id="mileaseSimulator">
			<div class="card">
				<h2>Milease Simulation Dashboard</h2>
				<div class="milease-form">

					<div class="milease-row">
						<div class="milease-sm-6">
							<label class="">Shop Size (m<sup>2</sup>)</label>
							<input type="text" class="milease-form-control shop-size">
							<span class="shop-size-error error">Shop size is required</span>
						</div>
						<div class="milease-sm-6">
							<label>Lease Expiry</label>
							<div class="milease-form-group">
								<label class="milease-calender-label"><i class="fas fa-calendar-alt"></i></label>
								<input type="text" class="milease-calender">
							</div>
						</div>
					</div>

					<div class="milease-row">
						<div class="milease-sm-6">
							<label class="">Rent in dollars</label>
							<input type="text" class="milease-form-control rent-dollar">
							<span class="rent-dollar-error error">Rent is required</span>
						</div>
						<div class="milease-sm-6">
							<label class="">Sales in dollars</label>
							<input type="text" class="milease-form-control sales-dollar">
							<span class="sales-dollar-error error">Sales size is required</span>
						</div>
					</div>

					<div class="milease-row">
						<div class="milease-sm-6">
							<label class="">Category</label>
							<select class="milease-form-control category">
								<option value="">Select Category</option>
								<?php foreach($this->categories as $category) { ?>
									<option value="<?php echo $category['id']?>"><?php echo $category['category_name']; ?></option>
								<?php } ?>
							</select>
							<span class="category-error error">Category is required</span>
						</div>
						<div class="milease-sm-6">
							<label class="">Shop Name</label>
							<input type="text" class="milease-form-control shop-name">
							<span class="shop-name-error error">Shop name is required</span>
						</div>
					</div>
					<button class="milease-button">CALCULATE</button>
					<div class="milease-divider"></div>
					<div class="milease-row hidden">
						<div class="milease-sm-6">
							<h4>Lease Expiry <span id="gauge-value">0</span> months</h4>
							<canvas id="canvas-preview"></canvas>
						</div>
						<div class="milease-sm-6">
							<h4>Industry Benchmark <span id="gauge-value-2">0</span>%</h4>
							<canvas id="canvas-preview-1"></canvas>
						</div>
					</div>

					<div class="milease-row">
						<div class="milease-sm-6">
							<strong>Shop Name:</strong> <span class="shop-name-value"></span>
						</div>
						<div class="milease-sm-6">
							<strong>Category:</strong> <span class="category-value"></span>
						</div>
					</div>
					<div class="milease-row">
						<div class="milease-sm-6">
							<strong>Sales:</strong> $ <span class="sales-value"></span>
						</div>
						<div class="milease-sm-6">
							<strong>Gross Rent:</strong> $ <spa class="gross-value"></span>
						</div>
					</div>
					<div class="milease-row">
						<div class="milease-sm-6">
							<strong>Shop Size:</strong> <span class="shop-size-value"></span> m<sup>2</sup>
						</div>
						<div class="milease-sm-6">
							<p style="font-size: 11px;font-style: italic;padding:5px;border:solid 1px #ccc;background-color: #f2f2f2;width:250px;margin:0 auto;text-align: center;">Benchmarks sourced from Australian Government  for more info <a href="https://www.ato.gov.au/Business/Small-business-benchmarks/In-detail/Benchmarks-A-Z/" target="_blank">click here</a></p>
						</div>
					</div>
				</div>

			</div>

		</div>


	<?php

	}

}
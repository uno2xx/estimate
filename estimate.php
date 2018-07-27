<?php 

/**
 * Plugin Name:       Milease Estimator
 * Description:       Rent estimate plugin
 * Version:           1.0.0
 * Author:            Odev Solutions
 * Author URI:        #
 * Text Domain:       alkaweb
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * GitHub Plugin URI: https://github.com/2Fwebd/feedier-wordpress
 */

/*
 * Plugin constants
 */

include( plugin_dir_path( __FILE__ ) . 'layout/AdminView.php');
include( plugin_dir_path( __FILE__ ) . 'layout/ExternalLayoutView.php');
include( plugin_dir_path( __FILE__ ) . 'database/db.php');
include( plugin_dir_path( __FILE__ ) . 'estimatemodel.php');

class Estimate {

	private $adminLayout;
	private $estimate;
	const TITLE = 'Milease Simulator';

	public function __construct() {	
		$this->adminLayout = new AdminView();
		$this->estimate = new EstimateModel();
		add_action('admin_menu', array($this,'addAdminMenu'));
		add_action('admin_enqueue_scripts', array($this, 'adminScripts'));
		add_action('wp_enqueue_scripts', array($this, 'simulatorScripts'));
		add_action('wp_ajax_insert_estimate', array($this, 'insert_estimate'));
		add_shortcode('milease-simulator', array($this, 'mileaseSimulatorShortcode'));
	}

	public function addAdminMenu() {
		add_menu_page( self::TITLE, self::TITLE, 'manage_options', 'estimate', array($this, 'loadLayout'), 'dashicons-dashboard');
	}

	public function loadLayout() {
		$data = $this->estimate->list();
		$this->adminLayout->adminLayout($data, self::TITLE);
	}

	public function adminScripts() {
		wp_enqueue_style('estimate_css', plugins_url( '/assets/estimate.css',  __FILE__ ) );
		wp_enqueue_script('estimate_js', plugins_url( '/assets/estimate.js',  __FILE__ ) );
		wp_localize_script('estimate_js', 'EstimateAjax', array( 'ajaxurl' => admin_url('admin-ajax.php') ) );
	}

	public function simulatorScripts() {
		wp_enqueue_style('estimate_datepicker_css','https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css');
		wp_enqueue_style('estimate_fonticons', 'https://use.fontawesome.com/releases/v5.2.0/css/all.css');
		wp_enqueue_style('estimate_external_css', plugins_url( '/assets/external/estimate.css',  __FILE__ ) );

		wp_enqueue_script('estimate_jquery', 'https://cdn.jsdelivr.net/jquery/latest/jquery.min.js');
		wp_enqueue_script('estimate_moment', 'https://cdn.jsdelivr.net/momentjs/latest/moment.min.js');
		wp_enqueue_script('estimate_datepicker', 'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js');
		wp_enqueue_script('estimate_gauge', plugins_url( '/assets/external/gauge.min.js',  __FILE__ ) );
		wp_localize_script('estimate_external_js', 'EstimateExternalAjax', array( 'ajaxurl' => admin_url('admin-ajax.php') ) );
		wp_enqueue_script('estimate_external_js', plugins_url( '/assets/external/estimate.js',  __FILE__ ) );
	}

	public function createDB() {
		$db = new EstimateDB();
		register_activation_hook( __FILE__ , array( $db , 'create' ) );
	}

	public function insert_estimate() {
		$response = $this->estimate->insert($_POST['data']);
		wp_send_json_success(
            wp_json_encode( ['id'=>$response] )
        );
	}

	public function mileaseSimulatorShortcode($atts) {
		new ExternalLayoutView(self::TITLE);
	}

}

$estimate = new Estimate();
$estimate->createDB();

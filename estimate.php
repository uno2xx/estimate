<?php 

/**
 * Plugin Name:       Estimate
 * Description:       Rent estimate plugin
 * Version:           1.0.0
 * Author:            Spin Design
 * Author URI:        https://bryanriveram.github.io/
 * Text Domain:       alkaweb
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * GitHub Plugin URI: https://github.com/2Fwebd/feedier-wordpress
 */

/*
 * Plugin constants
 */

include( plugin_dir_path( __FILE__ ) . 'layout/layout.php');
include( plugin_dir_path( __FILE__ ) . 'database/db.php');

class Estimate {

	private $adminLayout;

	public function __construct() {	
		$this->adminLayout = new EstimateAdminLayout();
		add_action('admin_menu', array($this,'addAdminMenu'));
		add_action('admin_enqueue_scripts', array($this, 'adminScripts'));
	}

	public function addAdminMenu() {
		add_menu_page( 'Estimate', 'Estimate', 'manage_options', 'estimate', array($this, 'loadLayout'), 'dashicons-dashboard');
	}

	public function loadLayout() {
		$this->adminLayout->adminLayout();
	}

	public function adminScripts() {
		wp_enqueue_style('estimate_css', plugins_url( 'estimate/assets/estimate.css', dirname(__FILE__) ) );
		wp_enqueue_script('estimate_js', plugins_url( 'estimate/assets/estimate.js', dirname(__FILE__) ) );
		wp_localize_script('estimate_js', 'EstimateAjax', array( 'ajaxurl' => admin_url('admin-ajax.php') ) );
	}

	public function createDB() {
		$db = new EstimateDB();
		register_activation_hook( __FILE__ , array( $db , 'create' ) );
	}

}

$estimate = new Estimate();
$estimate->createDB();
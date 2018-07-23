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
if(!defined('ESTIMATE_URL'))
	define('ESTIMATE_URL', plugin_dir_url( __FILE__ ));
if(!defined('ESTIMATE_PATH'))
	define('ESTIMATE_PATH', plugin_dir_path( __FILE__ ));

class Estimate {

	public function __construct() {

		add_action('admin_menu', array($this,'addAdminMenu'));

	}


	public function addAdminMenu() {
		add_menu_page( 'Estimate', 'Estimate', 'manage_options', 'estimate', array($this,'test_init') );
	}

	public function test_init(){
        echo "<h1>Hello World!</h1>";
	}

}

new Estimate();
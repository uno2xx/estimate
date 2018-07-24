<?php 

require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

class EstimateDB {


	protected $db;
	protected $jal;

	public function __construct() {
		
	}

	public static function create() {

		global $wpdb;
		global $jal_db_version;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'estimate_categories';

		$sql = "CREATE TABLE $table_name (
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`category_name` varchar(100) NOT NULL,
			`low` int(11) NOT NULL,
			`high` int(11) NOT NULL,
			UNIQUE KEY `id` (`id`)
		) $charset_collate;";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql );
		add_option('jal_db_version', $jal_db_version);
	}

}
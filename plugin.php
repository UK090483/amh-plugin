<?php

/**
 * Plugin Name: Alle müssen handeln Plugin
 * Plugin URI: https://alle-müssen-handeln.de/
 * Description: 
 * Author: Konrad Ullrich
 * Author URI: https://alle-müssen-handeln.de/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Block Initializer.
 */




function amh_block_category_setup($categories, $post)
{
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'alle-müssen-handeln',
				'title' => 'Alle müssen Handeln Blocks'
			),
		)
	);
}
add_filter('block_categories', 'amh_block_category_setup', 10, 2);



require_once plugin_dir_path(__FILE__) . 'src/init.php';


require plugin_dir_path(__FILE__) . 'plugin-update-checker-4.8.1/plugin-update-checker.php';
$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
	'https://github.com/UK090483/amh-plugin/',
	__FILE__, //Full path to the main plugin file or functions.php.
	'amh-plugin'
);

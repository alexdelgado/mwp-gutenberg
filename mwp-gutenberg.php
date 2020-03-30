<?php
/**
 * Plugin Name: Gutenberg Block Plugin
 * Plugin URI:
 * Description: A custom WordPress Gutenberg plugin.
 * Author: Alex Delgado
 * Author URI: https://alexdelgado.github.io/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package mwp/gutenberg
 */

namespace MWP\Gutenberg;

require_once __DIR__ . '/vendor/autoload.php';

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MWP_PLUGIN_URI', plugins_url( null, __FILE__ ) );
define( 'MWP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

add_action( 'init', array( 'MWP\Gutenberg\Plugin', 'singleton' ) );
add_action( 'after_setup_theme', array( 'MWP\Gutenberg\Plugin', 'after_setup_theme' ) );

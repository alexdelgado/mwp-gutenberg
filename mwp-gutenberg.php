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

add_action( 'init', array( 'MWP\Gutenberg\Plugin', 'singleton' ) );

<?php
/**
 * Gutenberg WordPress Plugin
 *
 * @package mwp/gutenberg
 */

namespace MWP\Gutenberg;

/**
 * Gutenberg Plugin
 */
class Plugin {

    public static $instance = false;

    public function __construct() {
    }

    /**
     * Singleton
     *
     * Returns a single instance of the current class.
     */
    public static function singleton() {

        if ( ! self::$instance ) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}

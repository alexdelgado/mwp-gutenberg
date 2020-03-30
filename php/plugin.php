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
        $this->_add_filters();
        $this->_register_block_types();
    }

    /**
     * Add Block Category
     *
     * Adds a custom category to the Gutenberg Block Editor.
     *
     * @param array $categories Array of block categories
     * @param \WP_Post $post Post being loaded
     */
    public function add_block_category( $categories = array(), $post ) {
        return array_merge(
            $categories,
            array(
                array(
                    'slug'  => 'mwp-gutenberg',
                    'title' => 'Custom Blocks',
                    'icon'  => null
                )
            )
        );
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

    /**
     * After Setup Theme
     *
     * Adds additional theme support features.
     */
    public static function after_setup_theme() {
        add_theme_support( 'editor-styles' );
        add_theme_support( 'align-wide' );
        add_theme_support( 'align-full' );
    }

    /**
	 * Add Filters
	 *
	 * Defines all the WordPress filters used by this theme.
	 */
    protected function _add_filters() {
        add_filter( 'block_categories', array( $this, 'add_block_category' ), 10, 2 );
    }

    /**
     * Register Block Types
     *
     * Registers our Custom Gutenberg blocks.
     */
    protected function _register_block_types() {
        if ( ! function_exists( 'register_block_type' ) ) {
            return;
        }

        wp_register_script(
            'mwp-gutenberg',
            MWP_PLUGIN_URI . '/build/plugin.min.js',
            array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n' ),
            filemtime( MWP_PLUGIN_PATH. 'build/plugin.min.js' )
        );

        wp_register_style(
            'mwp-gutenberg-editor',
             MWP_PLUGIN_URI . '/build/plugin.min.css',
            array( 'wp-edit-blocks' ),
            filemtime( MWP_PLUGIN_PATH. 'build/plugin.min.css' )
        );

        $blocks = array( 'mwp/hero' );

        $defaults = array(
            'editor_script' => 'mwp-gutenberg',
            'editor_style'  => 'mwp-gutenberg-editor',
        );

        foreach ( $blocks as $key => $value ) {

            if ( \is_array( $value ) ) {
                register_block_type(
                    $key,
                    array(
                        'editor_script' => $value['editor_script'],
                        'editor_style'  => $value['editor_style']
                    )
                );
            } else {
                register_block_type(
                    $value,
                    array(
                        'editor_script' => $defaults['editor_script'],
                        'editor_style'  => $defaults['editor_style']
                    )
                );
            }
        }
    }
}

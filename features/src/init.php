<?php

/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */



class Ku_base
{


    static $prefix = 'amh_plugin';
    static function init()
    {

        self::front_back_style();
        self::front_js();
    }

    static function enqueue_block_editor_assets()
    {
        self::blocks_editor_css();
        self::block_js();
    }

    static function front_back_style()
    {
        wp_register_style(
            self::$prefix . '-style-css', // Handle.
            // plugins_url('dist/blocks.style.build.css', dirname(__FILE__)), // Block style CSS.
            plugins_url('/dist/blocks.style.build.css', dirname(__FILE__)), // Block editor CSS.
            array('wp-editor'), // Dependency to include the CSS after it.
            null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
        );
        wp_enqueue_style(self::$prefix . '-style-css');
    }

    static function front_js()
    {
        wp_register_script(self::$prefix . 'block-frontend', plugins_url('dist/blocks.frontend.js', dirname(__FILE__)), array(),  '1.1', true);
        // wp_register_script('ku-block-frontend',  plugins_url('ku_base_plugin/dist/blocks.frontend.js'), array(),  '1.1', true);
        $wf_mailchimp_block = array('ajaxurl' => admin_url('admin-ajax.php'));

        wp_localize_script(self::$prefix . 'block-frontend', 'ku_block', $wf_mailchimp_block);
        // wp_enqueue_script('blocks-main-js', plugin_dir_url(__FILE__) . '/blocksmain.js', array(), '1.1', true);
        wp_enqueue_script(self::$prefix . 'block-frontend');
    }

    static function block_js()
    {

        wp_register_script(
            self::$prefix . 'block-js', // Handle.
            plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-hooks', 'wp-compose', 'lodash', 'wp-data'), // Dependencies, defined above.
            null,
            true // Enqueue the script in the footer.
        );
        wp_enqueue_script(self::$prefix . 'block-js');
    }
    static function blocks_editor_css()
    {
        wp_register_style(
            self::$prefix . 'block-editor-css', // Handle.
            plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.

            array('wp-edit-blocks'), // Dependency to include the CSS after it.
            null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
        );
        wp_enqueue_style(self::$prefix . 'block-editor-css');
    }
}

add_action('init', array('Ku_base', 'init'));
add_action('enqueue_block_editor_assets', array('Ku_base', 'enqueue_block_editor_assets'));
// add_action('enqueue_block_assets', 'melike_gallery_plugin_scripts');

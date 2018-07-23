/**
 * Customizer controls toggles
 *
 * @package Astra
 */

( function( $ ) {

	/* Internal shorthand */
	var api = wp.customize;

	/**
	 * Trigger hooks
	 */
	ASTControlTrigger = {

	    /**
	     * Trigger a hook.
	     *
	     * @since 1.0.0
	     * @method triggerHook
	     * @param {String} hook The hook to trigger.
	     * @param {Array} args An array of args to pass to the hook.
		 */
	    triggerHook: function( hook, args )
	    {
	    	$( 'body' ).trigger( 'astra-control-trigger.' + hook, args );
	    },

	    /**
	     * Add a hook.
	     *
	     * @since 1.0.0
	     * @method addHook
	     * @param {String} hook The hook to add.
	     * @param {Function} callback A function to call when the hook is triggered.
	     */
	    addHook: function( hook, callback )
	    {
	    	$( 'body' ).on( 'astra-control-trigger.' + hook, callback );
	    },

	    /**
	     * Remove a hook.
	     *
	     * @since 1.0.0
	     * @method removeHook
	     * @param {String} hook The hook to remove.
	     * @param {Function} callback The callback function to remove.
	     */
	    removeHook: function( hook, callback )
	    {
		    $( 'body' ).off( 'astra-control-trigger.' + hook, callback );
	    },
	};

	/**
	 * Helper class that contains data for showing and hiding controls.
	 *
	 * @since 1.0.0
	 * @class ASTCustomizerToggles
	 */
	ASTCustomizerToggles = {

		'astra-settings[display-site-title]' :
		[
			{
				controls: [
					'astra-settings[divider-section-header-typo-title]',
					'astra-settings[font-size-site-title]',
				],
				callback: function( value ) {

					if ( value ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'astra-settings[logo-title-inline]',
				],
				callback: function( value ) {

					var site_tagline = api( 'astra-settings[display-site-tagline]' ).get();
					var has_custom_logo = api( 'custom_logo' ).get();
					var has_retina_logo = api( 'astra-settings[ast-header-retina-logo]' ).get();

					if ( ( value || site_tagline ) && ( has_custom_logo || has_retina_logo ) ) {
						return true;
					}
					return false;
				}
			},
		],

		'astra-settings[display-site-tagline]' :
		[
			{
				controls: [
					'astra-settings[divider-section-header-typo-tagline]',
					'astra-settings[font-size-site-tagline]',
				],
				callback: function( value ) {

					if ( value ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'astra-settings[logo-title-inline]',
				],
				callback: function( value ) {

					var site_title = api( 'astra-settings[display-site-title]' ).get();
					var has_custom_logo = api( 'custom_logo' ).get();
					var has_retina_logo = api( 'astra-settings[ast-header-retina-logo]' ).get();

					if ( ( value || site_title ) && ( has_custom_logo || has_retina_logo ) ) {
						return true;
					}
					return false;
				}
			},
		],

		'astra-settings[ast-header-retina-logo]' :
		[
			{
				controls: [
					'astra-settings[logo-title-inline]',
				],
				callback: function( value ) {

					var has_custom_logo = api( 'custom_logo' ).get();
					var site_tagline = api( 'astra-settings[display-site-tagline]' ).get();
					var site_title = api( 'astra-settings[display-site-title]' ).get();

					if ( ( value || has_custom_logo ) && ( site_title || site_tagline ) ) {
						return true;
					}
					return false;
				}
			},
		],

		'custom_logo' :
		[
			{
				controls: [
					'astra-settings[logo-title-inline]',
				],
				callback: function( value ) {

					var has_retina_logo = api( 'astra-settings[ast-header-retina-logo]' ).get();
					var site_tagline = api( 'astra-settings[display-site-tagline]' ).get();
					var site_title = api( 'astra-settings[display-site-title]' ).get();

					if ( ( value || has_retina_logo ) && ( site_title || site_tagline ) ) {
						return true;
					}
					return false;
				}
			},
		],

		/**
		 * Section - Header
		 *
		 * @link  ?autofocus[section]=section-header
		 */

		/**
		 * Layout 2
		 */
		// Layout 2 > Right Section > Text / HTML
		// Layout 2 > Right Section > Search Type
		// Layout 2 > Right Section > Search Type > Search Box Type.

		/**
		 * Blog
		 */
		'astra-settings[blog-post-structure]' :
		[
			{
				controls: [
					'astra-settings[blog-meta]',
				],
				callback: function( blog_structure ) {
					if ( jQuery.inArray ( "title-meta", blog_structure ) !== -1 ) {
						return true;
					}
					return false;
				}
			}
		],

		/**
		 * Blog Single
		 */
		 'astra-settings[blog-single-post-structure]' :
		[
			{
				controls: [
					'astra-settings[blog-single-meta]',
				],
				callback: function( blog_structure ) {
					if ( jQuery.inArray ( "single-title-meta", blog_structure ) !== -1 ) {
						return true;
					}
					return false;
				}
			}
		],
		'astra-settings[blog-single-meta]' :
		[
			{
				controls: [
					'astra-settings[blog-single-meta-comments]',
					'astra-settings[blog-single-meta-cat]',
					'astra-settings[blog-single-meta-author]',
					'astra-settings[blog-single-meta-date]',
					'astra-settings[blog-single-meta-tag]',
				],
				callback: function( enable_postmeta ) {

					if ( '1' == enable_postmeta ) {
						return true;
					}
					return false;
				}
		}
		],

		/**
		 * Small Footer
		 */
		'astra-settings[footer-sml-layout]' :
		[
			{
				controls: [
					'astra-settings[section-ast-small-footer-background-styling]',
					'astra-settings[ast-small-footer-color]',
					'astra-settings[ast-small-footer-link-color]',
					'astra-settings[ast-small-footer-link-hover-color]',
					'astra-settings[ast-small-footer-bg-img]',
					'astra-settings[ast-small-footer-text-font]',
					'astra-settings[footer-sml-divider]',
					'astra-settings[section-ast-small-footer-layout-info]',
					'astra-settings[footer-color]',
					'astra-settings[footer-link-color]',
					'astra-settings[footer-link-h-color]',
					'astra-settings[footer-bg-obj]',
					'astra-settings[divider-footer-image]',
				],
				callback: function( small_footer_layout ) {

					if ( 'disabled' != small_footer_layout ) {
						return true;
					}
					return false;
				}
			},
		],

		/**
		 * Footer Widgets
		 */
		'astra-settings[footer-adv]' :
		[
			{
				controls: [
					'astra-settings[footer-adv-background-divider]',
					'astra-settings[footer-adv-wgt-title-color]',
					'astra-settings[footer-adv-text-color]',
					'astra-settings[footer-adv-link-color]',
					'astra-settings[footer-adv-link-h-color]',
					'astra-settings[footer-adv-bg-obj]',
				],
				callback: function( footer_widget_area ) {

					if ( 'disabled' != footer_widget_area ) {
						return true;
					}
					return false;
				}
			},
		],
		'astra-settings[shop-archive-width]' :
		[
			{
				controls: [
					'astra-settings[shop-archive-max-width]'
				],
				callback: function( blog_width ) {

					if ( 'custom' == blog_width ) {
						return true;
					}
					return false;
				}
			}
		],
	};

} )( jQuery );
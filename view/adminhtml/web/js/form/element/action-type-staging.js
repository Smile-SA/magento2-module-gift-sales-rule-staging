/**
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future.
 *
 * @category  Smile
 * @package   Smile\GiftSalesRule
 * @author    Maxime Queneau <maxime.queneau@smile.fr>
 * @copyright 2020 Smile
 * @license   Open Software License ("OSL") v. 3.0
 */
define([
    'jquery',
    'underscore',
    'uiRegistry',
    'Magento_Ui/js/form/element/select'
], function ($, _, uiRegistry, select) {
    'use strict';

    return select.extend({

        /**
         * Check if is offer product rule
         *
         * @returns {boolean}
         */
        isOfferProducRule: function () {
            return this.value() == 'offer_product' || this.value() == 'offer_product_per_price_range';
        },

        /**
         * Check if is offer product rule per price range
         *
         * @returns {boolean}
         */
        isOfferProducRulePerPriceRange: function () {
            return this.value() == 'offer_product_per_price_range';
        },

        /**
         * Hide / show fields
         */
        onUpdate: function () {
            this._super();

            this.changeLegend();

            this.updateProductSelect();

            if (!this.isOfferProducRule()) {
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.discount_amount')
                    .show();
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.discount_qty')
                    .show();
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.discount_step')
                    .show();
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.apply_to_shipping')
                    .show();
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.maximum_number_product')
                    .hide();
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.price_range')
                    .hide();
            } else {
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.discount_amount')
                    .hide();
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.discount_qty')
                    .hide();
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.discount_step')
                    .hide();
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.apply_to_shipping')
                    .hide();
                uiRegistry
                    .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.maximum_number_product')
                    .show();
                if (this.isOfferProducRulePerPriceRange()) {
                    uiRegistry
                        .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.price_range')
                        .show();
                }
            }
        },

        /**
         * Change legend of product actions fieldset
         */
        changeLegend: function () {
            var legend = $('.fieldset[id^="salesrulestaging_update_formrule_actions_fieldset_"] legend');

            if (this.isOfferProducRule()) {
                legend.text(_('Select gift product:'));
            } else {
                legend.text(_('Apply the rule only to cart items matching the following conditions (leave blank for all items).'));
            }
        },

        /**
         * Display or not "Cart Item Attribute" in product select
         */
        updateProductSelect: function () {
            var optgroup = $(".salesrulestaging_upcoming_form_salesrulestaging_upcoming_form_salesrulestaging_update_form_modal_update_form_loader optgroup[label='Cart Item Attribute']");

            if (this.isOfferProducRule()) {
                optgroup.hide();
            } else {
                optgroup.show();
            }
        }
    });
});

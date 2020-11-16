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
    'uiRegistry',
    'Magento_Ui/js/form/components/fieldset',
    'jquery'
], function (uiRegistry, fieldset, $) {
    'use strict';

    return fieldset.extend({

        /**
         * Check if is offer product rule
         *
         * @returns {boolean}
         */
        isOfferProducRule: function () {
            var value = uiRegistry
                .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.simple_action')
                .value();
            return value == 'offer_product' || value == 'offer_product_per_price_range';
        },

        /**
         * Check if is offer product rule per price range
         *
         * @returns {boolean}
         */
        isOfferProducRulePerPriceRange: function () {
            var value = uiRegistry
                .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.simple_action')
                .value();
            return value == 'offer_product_per_price_range';
        },

        /**
         * Sets 'opened' flag to true.
         *
         * @returns {Collapsible} Chainable.
         */
        open: function () {
            this._super();

            setTimeout(this.updateProductSelect, 1000, this);
            setTimeout(this.updateInput, 1000, this);

            return this;
        },

        /**
         * Display or not "Cart Item Attribute" in product select
         */
        updateProductSelect: function (fieldset) {
            var optgroup = $(".salesrulestaging_upcoming_form_salesrulestaging_upcoming_form_salesrulestaging_update_form_modal_update_form_loader optgroup[label='Cart Item Attribute']");

            if (optgroup) {
                if (fieldset.isOfferProducRule()) {
                    optgroup.hide();
                } else {
                    optgroup.show();
                }
            }
        },

        /**
         * Display or not input in actions tab
         */
        updateInput: function (fieldset) {
            if (!fieldset.isOfferProducRule()) {
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
                if (fieldset.isOfferProducRulePerPriceRange()) {
                    uiRegistry
                        .get('salesrulestaging_update_form.salesrulestaging_update_form.actions.price_range')
                        .show();
                }
            }
        }
    });
});

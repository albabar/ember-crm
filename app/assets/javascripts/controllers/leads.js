App.LeadsController = Ember.ArrayController.extend({
    sortProperties: ['firstName', 'lastName'],
    leads: function() {
        return this.get('search')? this.get('filteredLeads') : this;
    }.property('search', 'filteredLeads'),
    filteredLeads: function() {
        var search = this.get('search').toLowerCase();
        return this.filter(function(lead) {
            return lead.get('fullName').toLowerCase().indexOf(search) != -1;
        });
    }.property('search', 'this.@each.fullName')
});

App.LeadController = Ember.ObjectController.extend({
    isEditing: false,

    showUnsavedMessage: function() {
        return this.get('isDirty') && !this.get('isSaving');
    }.property('isDirty', 'isSaving'),

    showSavingMessage: function() {
        return this.get('isDirty') && this.get('isSaving');
    }.property('isDirty', 'isSaving'),

    actions: {
        saveChanges: function() {
            if(this.get('model.isDirty')) this.get('model').save();
        },
        delete: function() {
            var self = this
            this.get('model').destroyRecord().then(function() {
                self.transitionToRoute('leads');
            });
        }
    }
});

App.LeadEditController = Ember.ObjectController.extend({

    actions: {

        saveChanges: function() {
            var self = this;
            this.get('model').save().then(function() {
                self.transitionToRoute('lead')
            });
        },
        cancel: function() {
            this.get('model').rollback();
            this.transitionToRoute('lead');
        }
    }
});

App.LeadsNewController = Ember.Controller.extend({

    actions: {
        createLead: function() {
            var self = this;
            if(App.Lead.isValid(this.get('fields'))) {
                var lead = this.store.createRecord('lead', this.get('fields'));
                lead.save().then(function() {
                    self.transitionToRoute('lead', lead)
                });
            } else {
                this.set('showError', true);
            }
        }
    }
});
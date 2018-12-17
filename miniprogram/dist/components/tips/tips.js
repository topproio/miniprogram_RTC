Component({
    options: {
        multipleSlots: true
    },
    properties: {
        icon: {
            type: Object,
            value: {
                type: 'info',
                size: 93
            },
        },
        title: {
            type: String,
            value: ''
        },
        description: {
            type: String,
            value: ''
        }
    }
});
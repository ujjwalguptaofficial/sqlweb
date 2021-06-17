module.exports = [
    {
        text: "Get Started",
        url: "get-started"
    },
    {
        text: "Installation",
        url: "installation"
    },
    {
        text: "Database",
        url: "database",
        children: [{
            text: "Column",
            url: "column"
        }]
    },
    {
        text: "insert",
        url: "insert"
    },
    {
        text: "Select",
        url: "select",
        children: [{
            text: "Limit",
            url: "limit",
        }, {
            text: "Skip",
            url: "skip"
        },
        {
            text: "Order By",
            url: "order-by"
        },
        // {
        //     text: "Aggregate",
        //     url: "aggregate"
        // },
        // {
        //     text: "Group By",
        //     url: "group-by"
        // },
        {
            text: "Distinct",
            url: "distinct"
        },
        {
            text: "Join",
            url: "join"
        },
        ]
    },
    {
        text: "Where",
        url: "where",
        children: [
            {
                text: "And",
                url: "and"
            },
            {
                text: "Not Equal",
                url: "not-equal"
            },
            {
                text: "Or",
                url: "or"
            },
            // {
            //     text: "Regex",
            //     url: "regex"
            // },
            {
                text: "Like",
                url: "like"
            },
            {
                text: "In",
                url: "in"
            },
            // {
            //     text: "Operators",
            //     url: "operators"
            // },
            {
                text: "Between",
                url: "between"
            },
        ]
    },
    {
        text: "Update",
        url: "update"
    },
    {
        text: "Remove",
        url: "remove"
    },
    {
        text: "Count",
        url: "count"
    },
    // {
    //     text: "Clear",
    //     url: "clear"
    // },
    // {
    //     text: "Drop Database",
    //     url: "drop-db"
    // },
    // {
    //     text: "Change Table Schema",
    //     url: "change-table-design"
    // },
];
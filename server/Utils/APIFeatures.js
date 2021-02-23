class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    //Todo Ranjith Javascript Weird functions
    //Todo This is equivalent to below code
    //Todo public void search()
    //Todo Need to understand Javascript concepts
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        //TODO need to learn how to filter teh records from javascript
        //Removing fileds from the query
        console.log(`Removing fileds from the query ${queryCopy}`);
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);

        console.log(`Advance filtering ${queryCopy}`);
        //Advance filtering
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        //TODO its confusing watch the videos again

        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
        //TODO undestand what is this will do in javascript
    }
}

module.exports = APIFeatures;
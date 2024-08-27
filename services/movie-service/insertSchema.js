/*
movie : 
req.body : {
    id : ,
    titleText : ,
    releaseYear : ,
    releaseDate : {
        day,
        month,
        year
    },
    runtime : ,
    metascore : ,
    plot : {
        plotText : ,
        language : {
            id : ,

        }
    },
    isAdult : ,
    criticReviews : ,
    countriesOfOrigin : {
        contries : [
            index : {
                id : 
            }
        ]
    },
    production : {
        edges : [
            :index : {
                node : {
                    company : {
                        id : ,
                        companyText : {
                            text : 
                        }
                    }
                }
            }
        ]
    },
    productionBudget : {
        budget : {
            amount : 
            currency : 
        }
    }
}
*/

/*
cast : 
req.body : {
    movieid : ,
    cast : {
        total : ,
        edges : [
            :index : {
                node : {
                    name : {
                        id : ,
                        nameText : {
                            text : 
                        },
                        primaryImage : {
                            url : ,
                            width : ,
                            height : 
                        }
                    },
                    attributes : null,
                    category : {
                        id : 
                    },
                    characters : [
                        :index : {
                            name : 
                        }
                    ],
                    episodeCredits : {
                        total : 0,
                        yearRange : null
                    }
                }
            }
        ]
    }
}
*/

/*
director : 
req.body : {
    movieid : ,
    director : [
        :index : {
            totalCredits : ,
            category : {
                text : 
            },
            credits : [
                :index : {
                    name : {
                        id : ,
                        nameText : {
                            text : ,

                        }
                    },
                    attributres : 
                }
            ]
        }
    ]
}
*/

/*
genre
req.body{
    movieid : ,
    genre : {
        genres : [
            :index : {
                text : ,
                id : 
            }
        ]
    }
}
*/

/*
review 
req.body : {
    movieid : ,
    reviews : {
        total : 
    }
}
*/

/*
trailer_gallery 
req.body : {
    movieid : ,
    video : {
        edges : [
            :index : {
                node : {
                    id : ,
                    contentType : {
                        displayName : {
                            value : 'Trailer'
                        }
                    },
                    name : {
                        value : 
                    },
                    runtime : {
                        value : 
                    },
                    thumbnail : {
                        height : ,
                        url : ,
                        width : ,
                    }
                }
            }
        ]
    }
}
*/
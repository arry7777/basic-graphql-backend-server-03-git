const graphql =require('graphql');
//const _ =require('lodash');
const Movie = require('../models/movie.js');
const Actor = require('../models/actor.js');

const {GraphQLObjectType,
            GraphQLString,
            GraphQLSchema,
            GraphQLID,
            GraphQLInt,
            GraphQLList,
            GraphQLNonNull  }= graphql;

// var  movies = [
// {name:"fun",genre:"fantasy",id:"1",actorId:"2"},
// {name:"funk",genre:"fantasy",id:"2",actorId:"1"},
// {name:"funky",genre:"fantasy",id:"3",actorId:"3"},
// {name:"lovely",genre:"fantasy",id:"4",actorId:"2"},
// {name:"posoi",genre:"fantasy",id:"5",actorId:"1"},
// {name:"haki",genre:"fantasy",id:"6",actorId:"3"}
// ];
// var  actors = [
// {name:"sexy",age:"36",id:"1"},
// {name:"hot",age:"57",id:"2"},
// {name:"yummy",age:"58",id:"3"}
// ];

const MovieType = new GraphQLObjectType({
            name:'Movie',
            fields:()=>({
                        id:{type:GraphQLID},
                        name:{type:GraphQLString}, 
                        genre:{type:GraphQLString},
                        actor:{
                                    type:ActorType,
                                    resolve(parent,args){
                                                console.log(parent);
                                          //      return _.find(actors,{id:parent.actorId})
                                          return Actor.findById(parent.actorId);
                                    }
                        }
            })
});

const ActorType = new GraphQLObjectType({
            name:'Actor',
            fields:()=>({
                        id:{type:GraphQLID},
                        age:{type:GraphQLInt},
                        name:{type:GraphQLString},
                        movies:{
                                    type:new GraphQLList(MovieType),
                                    resolve(parent,args){
                                                //parent data on actor object 
                                        //        return _.filter(movies,{actorId:parent.id});
                                        return Movie.find({actorId:parent.id});
                                    }
                        }
            })
});

//setting up root query to get into the graph,entry point of gprah

const RootQuery = new GraphQLObjectType({
            name:'RootQueryType',
            fields:{
                 movie:{//name writtenn at the frontend
                        type:MovieType,
                                    //arguments to be passed to the query to get data from frontend
                        args:{id:{type:GraphQLID}},
                          resolve(parent,args){
                                    //  write code to get data from database db,source 
                                                //example it has access to args with id property

                                           //     return _.find(movies,{id:args.id});
                                          return Movie.findById(args.id);
                                    }
                        },
                actor:{
                            type:ActorType,
                            args:{id:{type:GraphQLID}},
                            resolve(parent,args){
                                       //         return _.find(actors,{id:args.id});
                                       return Actor.findById(args.id);
                            }
                        },
               movies: {
                           type:new GraphQLList(MovieType),
                           resolve(parent,args){
                              //      return movies;
                              return Movie.find({});
                           }
               },
               actors: {
                           type:new GraphQLList(ActorType),
                           resolve(parent,args){
                                  //     return actors;
                                  return Actor.find({});
                           }
               }                 

            }
});

// Mutation is used to change the data
//ex, at add actor so create a add actor mutation object with name:addActor

const Mutation = new GraphQLObjectType({
       name:'Mutation',
       fields:{
              addActor:{
                     type:ActorType,
                     args:{
                          name:{type:new GraphQLNonNull(GraphQLString)},
                          age:{type:new GraphQLNonNull(GraphQLInt)},
                           },
                     resolve(parent,args){
                            // Actor is mongodb model we inported above
                            let actor=new Actor({
                                   name:args.name,
                                   age:args.age
                            });
                          return  actor.save();
                     }      
              },
              addMovie:{
                     type:MovieType,
                     args:{
                            name:{type:new GraphQLNonNull(GraphQLString)},
                            genre:{type:new GraphQLNonNull(GraphQLString)},
                            actorId:{type:new GraphQLNonNull(GraphQLID)}
                     },
                     resolve(parent,args){
                            //Movie is the mongodb model above 
                            let movie = new Movie({
                                   name:args.name,
                                   genre:args.genre,
                                   actorId:args.actorId,
                            });
                            return movie.save();
                     }

              }
       }
})

module.exports =new GraphQLSchema({
            query:RootQuery,
            mutation:Mutation
});
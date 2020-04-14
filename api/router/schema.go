package router

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/cescoferraro/spotify/api/spotify"
	"log"
	"reflect"
	"time"
	"unicode"

	"github.com/graphql-go/graphql"
	og "github.com/zmb3/spotify"
)

var (
	buffer bytes.Buffer
)

// Post  dsjn
type Post struct {
	ID    int `json:"id" graphql:"id"`
	Likes int `json:"likes" graphql:"likes"`
}
type YAY struct {
	ID    int `json:"id" graphql:"id"`
	Likes int `json:"likes" graphql:"likes"`
}
type Result struct {
	Result og.PlayerState `json:"result" graphql:"result"`
}

func schemaConfig() (graphql.SchemaConfig, error) {
	PlayerStateGqlType := graphql.NewObject(
		graphql.ObjectConfig{
			Name: "PlayerState",
			Fields: graphql.Fields{
				"Timestamp": &graphql.Field{Type: graphql.Int},
				"PlaybackContext": &graphql.Field{
					Type: graphql.NewObject(graphql.ObjectConfig{
						Name: "PlaybackContext",
						Fields: graphql.Fields{
							"Endpoint": &graphql.Field{
								Type: graphql.String,
							}, "Type": &graphql.Field{
								Type: graphql.String,
							}},
					}),
				},
				"Progress": &graphql.Field{
					Type: graphql.Int,
				},
				"Playing": &graphql.Field{
					Type: graphql.Boolean,
				},
				"Device": &graphql.Field{
					Type: graphql.NewObject(graphql.ObjectConfig{
						Name: "Device",
						Fields: graphql.Fields{"Active": &graphql.Field{
							Type: graphql.Boolean,
						}, "Restricted": &graphql.Field{
							Type: graphql.Boolean,
						}, "Name": &graphql.Field{
							Type: graphql.String,
						}, "Type": &graphql.Field{
							Type: graphql.String,
						}, "Volume": &graphql.Field{
							Type: graphql.Int,
						}},
					}),
				},
				"ShuffleState": &graphql.Field{
					Type: graphql.Boolean,
				},
				"RepeatState": &graphql.Field{
					Type: graphql.String,
				},
			},
		})

	PrivateUserGqlType := graphql.NewObject(graphql.ObjectConfig{
		Name: "PrivateUser",
		Fields: graphql.Fields{
			"DisplayName": &graphql.Field{
				Type: graphql.String,
			},
			"Followers": &graphql.Field{
				Type: graphql.NewObject(graphql.ObjectConfig{
					Name: "Followers",
					Fields: graphql.Fields{"Endpoint": &graphql.Field{
						Type: graphql.String,
					}},
				}),
			},
			"Endpoint": &graphql.Field{
				Type: graphql.String,
			},
			"URI": &graphql.Field{
				Type: graphql.String,
			},
			"ID": &graphql.Field{
				Type: graphql.String,
			},
			"Images": &graphql.Field{
				Type: graphql.NewList(
					graphql.NewObject(graphql.ObjectConfig{
						Name: "Images",
						Fields: graphql.Fields{
							"Height": &graphql.Field{
								Type: graphql.Int,
							},
							"Width": &graphql.Field{
								Type: graphql.Int,
							},
							"URL": &graphql.Field{
								Type: graphql.String,
							}},
					})),
			},
			"Country": &graphql.Field{
				Type: graphql.String,
			},
			"Email": &graphql.Field{
				Type: graphql.String,
			},
			"Product": &graphql.Field{
				Type: graphql.String,
			},
			"Birthdate": &graphql.Field{
				Type: graphql.String,
			},
		},
	})

	log.Println(PlayerStateGqlType)

	getRootDescription(og.CurrentlyPlaying{})
	getRootDescription(og.PrivateUser{})

	//me, err := GetGraphQLObject(og.CurrentlyPlaying{})
	//if err != nil {
	//	return graphql.SchemaConfig{}, err
	//}
	//_, err = GetGraphQLObject(og.PlayerState{})
	//if err != nil {
	//	return graphql.SchemaConfig{}, err
	//}
	//me, err := GetGraphQLObject(og.PrivateUser{})
	//if err != nil {
	//	return graphql.SchemaConfig{}, err
	//}

	//output := graphql.NewObject(
	//	graphql.ObjectConfig{
	//		Name: "PlayerState",
	//	},
	//)
	return graphql.SchemaConfig{
		Mutation: graphql.NewObject(
			graphql.ObjectConfig{
				Name:        "Mutation",
				Description: "",
				Interfaces:  nil,
				Fields: graphql.Fields{
					"test": &graphql.Field{
						Type: graphql.String,
						Resolve: func(p graphql.ResolveParams) (interface{}, error) {
							return 32, nil
						},
					},
				},
				IsTypeOf: nil,
			},
		),
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name: "Query",
			Fields: graphql.Fields{
				"login": &graphql.Field{
					Type: graphql.String,
					Resolve: func(p graphql.ResolveParams) (interface{}, error) {
						return spotify.Auth().AuthURL("dashboard"), nil
					},
				},
				"me": &graphql.Field{
					Type: PrivateUserGqlType,
					Resolve: func(p graphql.ResolveParams) (interface{}, error) {
						user, err := spotify.GetProfile(p.Context.Value(key("token")).(string))
						if err != nil {
							log.Println(err.Error())
							return nil, err
						}
						return user, nil
					},
				},
				"nowPlaying": &graphql.Field{
					Type: PlayerStateGqlType,
					Resolve: func(p graphql.ResolveParams) (interface{}, error) {
						user, err := spotify.PlayerState(p.Context.Value(key("token")).(string))
						if err != nil {
							log.Println(err.Error())
							return nil, err
						}
						hss, err := json.MarshalIndent(user, "", "  ")
						if err != nil {
							log.Println(err.Error())
							return nil, err
						}
						log.Println(string(hss))
						return user, nil
					},
				},
			},
		}),
	}, nil
}

//GetGraphQLObject Converts struct into graphql object
func GetGraphQLObject(object interface{}) (*graphql.Object, error) {
	objectType := reflect.TypeOf(object)
	fields, err := convertStruct(objectType)

	output := graphql.NewObject(
		graphql.ObjectConfig{
			Name:   objectType.Name(),
			Fields: fields,
		},
	)

	if err != nil {
		err = fmt.Errorf("Error While Converting Struct To GraphQL Object: %v", err)
		return &graphql.Object{}, err
	}

	return output, nil
}

//convertStructToObject converts simple struct to graphql object
func convertStructToObject(
	objectType reflect.Type) (*graphql.Object, error) {

	fields, err := convertStruct(objectType)
	if err != nil {
		err = fmt.Errorf(
			"Error while converting type %v to graphql fields: %v",
			objectType,
			err,
		)
		return &graphql.Object{}, err
	}

	object := graphql.NewObject(
		graphql.ObjectConfig{
			Name:   objectType.Name(),
			Fields: fields,
		},
	)
	hh, err := json.MarshalIndent(object, "", " ")
	if err != nil {
		return &graphql.Object{}, err
	}
	log.Println(hh)
	return object, nil
}

//convertStruct converts struct to graphql fields
func convertStruct(objectType reflect.Type) (graphql.Fields, error) {
	fields := graphql.Fields{}

	for i := 0; i < objectType.NumField(); i++ {
		currentField := objectType.Field(i)
		fieldType, err := getFieldType(currentField)
		if err != nil {
			err = fmt.Errorf(
				"Error while converting type %v to graphQL Type: %v",
				currentField.Type,
				err,
			)
			return graphql.Fields{}, err
		}

		initial := LowerInitial(currentField.Name)
		log.Println(initial)
		log.Println(currentField.Type)
		fields[initial] = &graphql.Field{
			Name:              (currentField.Name),
			Type:              fieldType,
			DeprecationReason: getTagValue(currentField, "deprecationReason"),
			Description:       getTagValue(currentField, "description"),
		}
	}

	return fields, nil
}
func LowerInitial(str string) string {
	if str == "ID" {
		return "id"
	}
	if str == "URI" {
		return "uri"
	}
	if str == "URL" {
		return "url"
	}
	for i, v := range str {
		return string(unicode.ToLower(v)) + str[i+1:]
	}
	return ""
}

//getFieldType Converts object to a graphQL field type
func getFieldType(object reflect.StructField) (graphql.Output, error) {

	isID, ok := object.Tag.Lookup("unique")
	if isID == "true" && ok {
		return graphql.ID, nil
	}

	objectType := object.Type
	if objectType.Kind() == reflect.Struct {
		return convertStructToObject(objectType)

	} else if objectType.Kind() == reflect.Slice &&
		objectType.Elem().Kind() == reflect.Struct {

		elemType, err := convertStructToObject(objectType.Elem())
		return graphql.NewList(elemType), err

	} else if objectType.Kind() == reflect.Slice {
		elemType, err := convertSimpleType(objectType.Elem())
		return graphql.NewList(elemType), err
	}

	return convertSimpleType(objectType)
}

//convertSimpleType converts simple type  to graphql field
func convertSimpleType(objectType reflect.Type) (*graphql.Scalar, error) {

	typeMap := map[reflect.Kind]*graphql.Scalar{
		reflect.String:                     graphql.String,
		reflect.Bool:                       graphql.Boolean,
		reflect.Int:                        graphql.Int,
		reflect.Int8:                       graphql.Int,
		reflect.Int16:                      graphql.Int,
		reflect.Int32:                      graphql.Int,
		reflect.Int64:                      graphql.Int,
		reflect.Float32:                    graphql.Float,
		reflect.Float64:                    graphql.Float,
		reflect.TypeOf(time.Time{}).Kind(): graphql.DateTime,
	}

	graphqlType, ok := typeMap[objectType.Kind()]

	if !ok {
		return graphql.String, nil
	}

	return graphqlType, nil
}

//getTagValue returns tag value of a struct
func getTagValue(objectType reflect.StructField, tagName string) string {
	tag := objectType.Tag
	value, ok := tag.Lookup(tagName)
	if !ok {
		return ""
	}
	return value
}

func describeStruct(s interface{}) {

	if reflect.ValueOf(s).Kind() == reflect.Slice {
		switch reflect.ValueOf(s).Type().Elem().Kind() {
		case reflect.Struct:

			iType := reflect.TypeOf(s).Elem()
			describeSlice(iType)

		default:
			describeSimpleType("!!! something wrong happens !!!")
		}

		return
	}

	iValue := reflect.ValueOf(s)
	iType := reflect.TypeOf(s)

	for i := 0; i < iType.NumField(); i++ {
		v := iValue.Field(i)

		switch v.Kind() {
		case reflect.Struct:
			buffer.WriteString(`"` + iType.Field(i).Name + `": &graphql.Field{
				Type: graphql.NewObject(graphql.ObjectConfig{
					Name: "` + iType.Field(i).Name + `",
					Fields: graphql.Fields{`)

			// describeSimpleType(iType.Field(i).Name, "struct", string(iType.Field(i).Tag))
			describeStruct(v.Interface())

			buffer.WriteString(`	},
      }),
    },`)
		case reflect.Slice:
			buffer.WriteString(`"` + iType.Field(i).Name + `": &graphql.Field{
				Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
					Name: "` + iType.Field(i).Name + `",
					Fields: graphql.Fields{`)

			// describeSimpleType(iType.Field(i).Name, "slice", string(iType.Field(i).Tag))
			describeStruct(v.Interface())

			buffer.WriteString(`	},
      })),
    },`)
		default:
			describeSimpleType(iType.Field(i).Name, iType.Field(i).Type.String(), string(iType.Field(i).Tag))
		}
	}
}

func describeSlice(iType reflect.Type) {

	for i := 0; i < iType.NumField(); i++ {

		switch iType.Field(i).Type.Kind() {
		case reflect.Struct:
			// fmt.Println("!!!", strings.Split(string(iType.Field(i).Tag), ":")[1])
			buffer.WriteString(`"` + iType.Field(i).Name + `": &graphql.Field{
				Type: graphql.NewObject(graphql.ObjectConfig{
					Name: "` + iType.Field(i).Name + `",
					Fields: graphql.Fields{`)

			describeSimpleType(iType.Field(i).Name, "struct", string(iType.Field(i).Tag))
			describeSlice(iType.Field(i).Type)
			buffer.WriteString(`},
      }),
    },`)
		case reflect.Slice:
			// if iType.Field(i).Type.Elem().Kind() == reflect.Struct {
			buffer.WriteString(`"` + iType.Field(i).Name + `": &graphql.Field{
				Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
					Name: "` + iType.Field(i).Name + `",
					Fields: graphql.Fields{`)
			describeSimpleType(iType.Field(i).Name, "slice", string(iType.Field(i).Tag))
			describeSlice(iType.Field(i).Type.Elem())
			buffer.WriteString(`},
      })),
    },`)
			// }
		default:
			describeSimpleType(iType.Field(i).Name, iType.Field(i).Type.String(), string(iType.Field(i).Tag))
		}
	}
}

func describeSimpleType(text ...interface{}) {
	var fieldName string = text[0].(string)
	// var fieldType string = text[1].(string)
	// var fieldTag string = strings.Split(text[2].(string), ":")[1]
	var out string = ""
	switch text[1] {
	case "string":
		out = `"` + fieldName + `": &graphql.Field{
        Type: graphql.String,
      },`
	case "bool":
		out = `"` + fieldName + `": &graphql.Field{
        Type: graphql.Boolean,
      },`
	case "int64":
		out = `"` + fieldName + `": &graphql.Field{
        Type: graphql.Int,
      },`
	case "int32":
		out = `"` + fieldName + `": &graphql.Field{
          Type: graphql.Int,
        },`
	case "int":
		out = `"` + fieldName + `": &graphql.Field{
            Type: graphql.Int,
          },`
	default:
		errors.New("!!! Error !!! no such format")
	}
	buffer.WriteString(out)
}

func getRootDescription(strct interface{}) {

	if reflect.TypeOf(strct).Kind() == reflect.Struct {
		buffer.WriteString("// Generated by gostruct2graphql\n")
		buffer.WriteString(reflect.TypeOf(strct).Name() + `GqlType := graphql.NewObject(graphql.ObjectConfig{
		  Name: "` + reflect.TypeOf(strct).Name() + `",
		  Fields: graphql.Fields{`)

		describeStruct(strct)

		buffer.WriteString(`},
})`)
	}

	if reflect.TypeOf(strct).Kind() == reflect.Slice {
		buffer.WriteString("// Generated by gostruct2graphql\n")
		buffer.WriteString(reflect.TypeOf(strct).Name() + `GqlType := graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		  Name: "` + reflect.TypeOf(strct).Name() + `",
		  Fields: graphql.Fields{`)

		describeStruct(strct)

		buffer.WriteString(`},
}))`)
	}
	buffer.WriteString("\n")
	fmt.Println(buffer.String())
	buffer.Reset()
}

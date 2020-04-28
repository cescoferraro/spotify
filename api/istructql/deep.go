package istructql

import (
	"github.com/graphql-go/graphql"
	"log"
	"reflect"
	"strings"
	"time"
)

var cache = make(map[string]*graphql.Object)

//GenerateType does all the magic. generates graphql objects from any struct interface
func GenerateType(y interface{}) *graphql.Object {
	name := structName(y)
	result, ok := cache[name]
	if !ok {
		fields := deepFields(y)
		cache[name] = fields
		return fields
	}
	return result
}

var defaultTag = "json"

//SetDefaultTag
//SetDefaultTag set the struct tag we should look for name matching. defaults to json
func SetDefaultTag(tag string) {
	defaultTag = tag
}

func deepFields(iface interface{}) *graphql.Object {
	fields := graphql.Fields{}
	rValue := reflect.ValueOf(iface)
	rType := reflect.TypeOf(iface)
	for i := 0; i < rType.NumField(); i++ {
		irValue, itValue := rValue.Field(i), rType.Field(i)
		jsonTag := strings.Split(itValue.Tag.Get(defaultTag), ",")[0]
		fieldName := not(jsonTag, irValue.Type())
		switch irValue.Kind() {
		case reflect.Struct:
			if irValue.Type().String() == "time.Time" {
				fields[fieldName] = &graphql.Field{
					Type: graphql.Int,
					Resolve: func(e graphql.ResolveParams) (interface{}, error) {
						of := reflect.ValueOf(e.Source)
						unix := time.Now().Unix()
						if of.CanInterface() {
							indirect := of
							if of.Kind() == reflect.Ptr {
								indirect = reflect.Indirect(of)
							}
							return indirect.FieldByName(itValue.Name).Interface().(time.Time).Unix(), nil
						}
						return unix, nil
					},
				}
				continue
			}
			fields[fieldName] = &graphql.Field{
				Type: GenerateType(irValue.Interface()),
			}
			continue
		case reflect.Slice:
			log.Println(jsonTag)
			for i := 0; i < irValue.Len(); i++ {
				kind := irValue.Index(i).Kind()
				switch kind {
				case reflect.Struct:
					fields[fieldName] = &graphql.Field{
						Type: graphql.NewList(GenerateType(irValue.Index(0).Interface())),
					}
					break
				default:
					fields[fieldName] = &graphql.Field{
						Type: graphql.NewList(mapReflectScalar(irValue.Index(0))),
					}
					break
				}
			}
			continue
		case reflect.Ptr:
			i2 := reflect.Indirect(reflect.ValueOf(irValue.Interface()))
			fields[fieldName] = &graphql.Field{
				Type: GenerateType(i2.Interface()),
			}
			continue
		default:
			if irValue.CanInterface() {
				if contains(cardinals, reflect.TypeOf(irValue.Interface()).Kind().String()) {
					fields[jsonTag] = &graphql.Field{Type: mapReflectScalar(irValue)}
					continue
				}
			}
			if contains(cardinals, itValue.Type.String()) {
				fields[jsonTag] = &graphql.Field{Type: mapReflectScalar(irValue)}
			}
		}
	}
	return graphql.NewObject(graphql.ObjectConfig{
		Name:   structName(iface),
		Fields: fields,
	})

}

var cardinals = []string{
	reflect.String.String(),
	reflect.Int.String(),
	reflect.Bool.String(),
}

func mapReflectScalar(v reflect.Value) *graphql.Scalar {
	switch v.Kind() {
	case reflect.Bool:
		return graphql.Boolean
	case reflect.String:
		return graphql.String
	case reflect.Float32:
		return graphql.Int
	case reflect.Float64:
		return graphql.Int
	case reflect.Int:
		return graphql.Int
	case reflect.Int8:
		return graphql.Int
	case reflect.Int16:
		return graphql.Int
	case reflect.Int32:
		return graphql.Int
	case reflect.Int64:
		return graphql.Int
	default:
		log.Println("not straight")
		if v.CanInterface() {
			replace := strings.Replace(structName(v.Interface()), "*", "", -1)
			switch replace {
			case "bool":
				return graphql.Boolean
			case "string":
				return graphql.String
			case "int":
				return graphql.Int
			default:
				if v.Kind() != reflect.Ptr {
					log.Println("ERROR " + replace + " " + v.Kind().String())
				}
			}
		}
	}
	return graphql.String
}

func not(tag string, t reflect.Type) string {
	if tag != "" {
		return tag
	}
	return split(t)
}

func split(t reflect.Type) string {
	split := strings.Split(t.String(), ".")
	if len(split) > 1 {
		return split[1]
	}
	return split[0]
}

func structName(myvar interface{}) string {
	return reflect.TypeOf(myvar).Name()
}
func contains(all []string, scalar string) bool {
	for _, ddd := range all {
		if ddd == scalar {
			return true
		}
	}
	return false
}

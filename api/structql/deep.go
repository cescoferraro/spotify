package structql

import (
	"github.com/graphql-go/graphql"
	"log"
	"reflect"
	"strings"
	"time"
)

var cache = make(map[string]*graphql.Object)

func GenerateType(y interface{}) *graphql.Object {
	name := StructName(y)
	result, ok := cache[name]
	if !ok {
		fields := DeepFields(y)
		cache[name] = fields
		return fields
	}
	return result
}
func DeepFields(iface interface{}) *graphql.Object {
	fields := graphql.Fields{}
	rValue := reflect.ValueOf(iface)
	rType := reflect.TypeOf(iface)
	for i := 0; i < rType.NumField(); i++ {
		irValue, itValue := rValue.Field(i), rType.Field(i)
		jsonTag := itValue.Tag.Get("json")
		fieldName := not(jsonTag, irValue.Type())
		switch irValue.Kind() {
		case reflect.Struct:
			if irValue.Type().String() == "time.Time" {
				fields[fieldName] = &graphql.Field{
					Type: graphql.Int,
					Resolve: func(e graphql.ResolveParams) (interface{}, error) {
						er := reflect.ValueOf(e.Source).FieldByName(itValue.Name)
						unix := er.Interface().(time.Time).Unix()
						log.Println(unix)

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
						Type: graphql.NewList(MapReflectScalar(irValue.Index(0))),
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
				if Contains(cardinals, reflect.TypeOf(irValue.Interface()).Kind().String()) {
					fields[jsonTag] = &graphql.Field{Type: MapReflectScalar(irValue)}
					continue
				}
			}
			if Contains(cardinals, itValue.Type.String()) {
				fields[jsonTag] = &graphql.Field{Type: MapReflectScalar(irValue)}
			}
		}
	}
	return graphql.NewObject(graphql.ObjectConfig{
		Name:   StructName(iface),
		Fields: fields,
	})

}

var cardinals = []string{
	reflect.String.String(),
	reflect.Int.String(),
	reflect.Bool.String(),
}

func MapReflectScalar(v reflect.Value) *graphql.Scalar {
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
			replace := strings.Replace(StructName(v.Interface()), "*", "", -1)
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

func StructName(myvar interface{}) string {
	return reflect.TypeOf(myvar).Name()
}
func Contains(all []string, scalar string) bool {
	for _, ddd := range all {
		if ddd == scalar {
			return true
		}
	}
	return false
}

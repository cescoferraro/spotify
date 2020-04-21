package structql

import (
	"github.com/graphql-go/graphql"
	"log"
	"reflect"
	"strings"
)

func DeepFields(iface interface{}) *graphql.Object {
	fields := graphql.Fields{}
	rValue := reflect.ValueOf(iface)
	rType := reflect.TypeOf(iface)
	for i := 0; i < rType.NumField(); i++ {
		irValue, jsonTag := rValue.Field(i), rType.Field(i).Tag.Get("json")
		fieldName := not(jsonTag, irValue.Type())
		switch irValue.Kind() {
		case reflect.Struct:
			fields[fieldName] = &graphql.Field{
				Type: GenerateType(irValue.Interface()),
			}
			continue
		case reflect.Slice:
			log.Println("sliceeee")
			i2 := reflect.TypeOf(irValue.Interface()).Elem()
			i3 := reflect.ValueOf(i2)
			log.Println(i3.Interface())
			continue
		case reflect.Ptr:
			i2 := reflect.Indirect(reflect.ValueOf(irValue.Interface()))
			log.Println(i2.Interface())
			fields[fieldName] = &graphql.Field{
				Type: GenerateType(i2.Interface()),
			}
			continue
		default:
			fields = funcName(irValue, fields, jsonTag)
		}
	}
	return graphql.NewObject(graphql.ObjectConfig{
		Name:   StructName(iface),
		Fields: fields,
	})

}
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

var cache = make(map[string]*graphql.Object)

func funcName(v reflect.Value, fields graphql.Fields, jsonTag string) graphql.Fields {
	switch v.Kind() {
	case reflect.Bool:
		fields[jsonTag] = &graphql.Field{Type: graphql.Boolean}
		break
	case reflect.String:
		fields[jsonTag] = &graphql.Field{Type: graphql.String}
		break
	case reflect.Int:
		fields[jsonTag] = &graphql.Field{Type: graphql.Int}
		break
	case reflect.Int8:
		fields[jsonTag] = &graphql.Field{Type: graphql.Int}
		break
	case reflect.Int16:
		fields[jsonTag] = &graphql.Field{Type: graphql.Int}
		break
	case reflect.Int32:
		fields[jsonTag] = &graphql.Field{Type: graphql.Int}
		break
	case reflect.Int64:
		fields[jsonTag] = &graphql.Field{Type: graphql.Int}
		break
	default:
		replace := strings.Replace(StructName(v.Interface()), "*", "", -1)
		switch replace {
		case "bool":
			fields[jsonTag] = &graphql.Field{Type: graphql.Boolean}
		case "string":
			fields[jsonTag] = &graphql.Field{Type: graphql.String}
		case "int":
			fields[jsonTag] = &graphql.Field{Type: graphql.Int}
		default:

			log.Println("ERROR " + replace + " " + v.Kind().String())
		}
	}
	return fields
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

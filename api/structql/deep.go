package structql

import (
	"encoding/json"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
	"log"
	"reflect"
	"strings"
	"time"
	"unicode"
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
			log.Println(fieldName)
			fields[fieldName] = &graphql.Field{
				Type: GenerateType(irValue.Interface()),
				Resolve: func(e graphql.ResolveParams) (interface{}, error) {
					log.Println(")))))))))))))))))")
					log.Println(fieldName)
					log.Println(itValue.Name)
					log.Println(itValue.Type)
					of := reflect.ValueOf(e.Source)
					er := of.FieldByName(itValue.Name)
					eee, _ := json.MarshalIndent(of.Interface(), "", " ")
					log.Println(string(eee))
					i2 := er.Interface()
					ee, _ := json.MarshalIndent(i2, "", " ")
					log.Println(string(ee))
					return i2, nil
				},
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
				//Resolve: func(e graphql.ResolveParams) (interface{}, error) {
				//	valueOf := reflect.ValueOf(e.Source)
				//	i3 := valueOf.FieldByName(jsonTag)
				//	return i3.Interface(), nil
				//},
			}
			continue
		default:
			if irValue.CanInterface() {
				if tools.Contains(cardinals, reflect.TypeOf(irValue.Interface()).Kind().String()) {
					fields[jsonTag] = &graphql.Field{Type: MapReflectScalar(irValue)}
					continue
				}
			}
			if tools.Contains(cardinals, itValue.Type.String()) {
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
	return (split(t))
}

// Camelcase to underscore style.
func ToUnderScore(name string) string {
	l := len(name)
	ss := strings.Split(name, "")

	// we just care about the key of idx map,
	// the value of map is meaningless
	idx := make(map[int]int, 1)

	var rs []rune
	for _, s := range name {
		rs = append(rs, []rune(string(s))...)
	}

	for i := l - 1; i >= 0; {
		if unicode.IsUpper(rs[i]) {
			var start, end int
			end = i
			j := i - 1
			for ; j >= 0; j-- {
				if unicode.IsLower(rs[j]) {
					start = j + 1
					break
				}
			}
			// handle the case: "BBC" or "AaBBB" case
			if end == l-1 {
				idx[start] = 1
			} else {
				if start == end {
					// value=1 is meaningless
					idx[start] = 1
				} else {
					idx[start] = 1
					idx[end] = 1
				}
			}
			i = j - 1
		} else {
			i--
		}
	}

	for i := l - 1; i >= 0; i-- {
		ss[i] = strings.ToLower(ss[i])
		if _, ok := idx[i]; ok && i != 0 {
			ss = append(ss[0:i], append([]string{"_"}, ss[i:]...)...)
		}
	}

	return strings.Join(ss, "")
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

package tools

import (
	"bytes"
	"fmt"
	"github.com/pkg/errors"
	"log"
	"reflect"
)

var (
	buffer bytes.Buffer
)

func describeStruct(s interface{}) {

	if reflect.ValueOf(s).Kind() == reflect.Slice {
		switch reflect.ValueOf(s).Type().Elem().Kind() {
		case reflect.Struct:

			iType := reflect.TypeOf(s).Elem()
			describeSlice(iType)

		default:
			describeSimpleType("!!! something wrong happens !!!", "sdfsfd")
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
	log.Println(text)
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

func GetRootDescription(strct interface{}) {

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

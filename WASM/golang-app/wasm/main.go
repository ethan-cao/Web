package main

import (
	"syscall/js"
)

func myGolangFunction() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return args[0].Int() + args[1].Int()
	})
}

func helloWorld() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return "Hello " + args[0].String()
	})
}

func main() {
	ch := make(chan struct{}, 0)

	js.Global().Set("helloWorld", helloWorld())
	js.Global().Set("myGolangFunction", myGolangFunction())

	<-ch
}

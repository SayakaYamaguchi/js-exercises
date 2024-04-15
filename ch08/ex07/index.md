/*
## 問題 8.7 🖋️
Web 上に公開されているブラウザの JavaScript で名前空間としての関数の即時関数実行式を使っている js ファイルを見つけて URL を記載しなさい。 (GitHub に公開するため社内限定サイトの URL は貼らないこと)
**出題範囲**: 8.5
*/

const { Linter } = require("eslint")

https://github.com/jquery/jquery/blob/main/src/callbacks.js
123Line ( function add( args ) {...
add メソッド内で即時関数として定義されており、すぐに呼び出されています。

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( typeof arg === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

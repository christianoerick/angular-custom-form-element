# Custom Form Element

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Installation

1.  Install Angular CLI

- [Angular Guide Page](https://angular.io/guide/setup-local).

2.  Create a new project

```shell
ng n project-name
```

## Pre-Configuration

1.  Install the packages below

```shell
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
```

2.  "app.modules.ts": Add imports below

```
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
```

3.  "app.modules.ts": Add the lines below anywhwere

```
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
```

4.  "app.modules.ts": add to imports:[]

```
imports: [
  HttpClientModule,
  ReactiveFormsModule,
  TranslateModule.forRoot({
    defaultLanguage: 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
],
```

5.  Create the json language file:

- [src/assets/i18n/en.json](src/assets/i18n/en.json)

## Configuration

1.  Create a module

```shell
ng g module sections
```

2.  Create a component

```shell
ng g component sections/form-element
```

3.  Example files:

- [src/app/sections/form-element/form-element.component.ts](src/app/sections/form-element/form-element.component.ts)
- [src/app/sections/form-element/form-element.component.html](src/app/sections/form-element/form-element.component.html)

4.  Add imports to [src/app/sections/sections.module.ts](src/app/sections/sections.module.ts)

```
import {FormsModule} from "@angular/forms";
imports: [
  FormsModule,
],
```

5.  Run project

```shell
ng serve
```

## EXAMPLE URL

https://codesandbox.io/s/angular-custom-form-element-s4417i

## NOTE

:warning:	This component was developed only for learning purpose. I was learning angular and I wanted to create a component for my forms. With [@CeloGomesBR](https://github.com/CeloGomesBR)'s help we were able to do what's published on this repository. We WON'T give any support nor answer questions. We shared it in order to help anyone looking for the same component.

-----

# Elemento de Formulário Customizado

- Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Instalação

1.  Instale o Angular CLI

- [Página guia do Angular](https://angular.io/guide/setup-local).

2.  Crie um projeto novo

```shell
ng n project-name
```

## Pre-Configuração

1.  Instale os pacotes abaixo

```shell
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
```

2.  "app.modules.ts": Adicione os imports abaixo

```
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
```

3.  "app.modules.ts": Adicione as linhas abaixo em qualquer local

```
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
```

4.  "app.modules.ts": Adicionar ao imports:[]

```
imports: [
  HttpClientModule,
  ReactiveFormsModule,
  TranslateModule.forRoot({
    defaultLanguage: 'pt-BR',
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
],
```

5.  Crie o arquivo json de idioma:

- [src/assets/i18n/pt-BR.json](src/assets/i18n/pt-BR.json)

## Configuração

1.  Crie um modulo

```shell
ng g module sections
```

2.  Crie um componente

```shell
ng g component sections/form-element
```

3.  Arquivos de exemplo:

- [src/app/sections/form-element/form-element.component.ts](src/app/sections/form-element/form-element.component.ts)
- [src/app/sections/form-element/form-element.component.html](src/app/sections/form-element/form-element.component.html)

4.  Adicionar imports [src/app/sections/sections.module.ts](src/app/sections/sections.module.ts)

```
import {FormsModule} from "@angular/forms";
imports: [
  FormsModule,
],
```

5.  Execute o projeto

```shell
ng serve
```

## URL DE EXEMPLO

https://codesandbox.io/s/angular-custom-form-element-s4417i

## ATENÇÃO

:warning:	Este componente foi desenvolvido apenas com o intuito de aprendizado. Eu estava aprendendo angular e queria criar um componente para meus formulários e com a ajuda do [@CeloGomesBR](https://github.com/CeloGomesBR) conseguimos fazer o que está publicado neste repositório. NÃO iremos dar nenhum suporte tampouco tirar dúvidas. Compartilhamos com o intuito de ajudar a quem esta procurando pelo mesmo componente.

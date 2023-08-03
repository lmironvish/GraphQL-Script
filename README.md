## GraphQL queries generating script

### install a package

```sh
npm i
```

### run script

```sh
node ./scripts/generateGraphql project-name
```

### available project name formats

>- project
>- project-name
>- projectName
>- project_name
>- "project name"

### script input
>./input/CompositeOffers.txt
> 
>./input/AvailableFeatures.txt

### script output

>./output/SpecialProjectNameCompositeOffers_yyyy_MM_dd.graphql
>
>./output/SpecialProjectNameAvailableFeatures_yyyy_MM_dd.graphql 
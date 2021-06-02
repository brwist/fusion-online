import React, {useState} from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useInitialProductFilterDataQuery, AttributeInput } from './generated/graphql';

interface IChecked {
  [index: string]: boolean;
}

const ProductFilters = ({attributeFilterHandler}: (attributes: AttributeInput[]) => void) => {
  const { loading, error, data} = useInitialProductFilterDataQuery({
    variables: {categories: [], collections: [], productTypes: [] }
});
  const [checked, setChecked] = useState<IChecked>({})

  const checkHandler = (event: any) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    return (
      <div>
        {data.attributes?.edges.map( ({node}) => {
          return (
            <div key={node.id}>
            <FormControl component="fieldset" >
              <FormLabel component="legend">{node.name}</FormLabel>
              <FormGroup>
                {node.values?.map((value: any) => {
                  const filterName = `attribute-${node.slug}-${value.slug}`
                  return (
                    <FormControlLabel
                    key={value.id}
                    control={<Checkbox checked={checked[filterName] || false} onChange={checkHandler} name={filterName} />}
                    label={value.name}
                  />
                  )
                })}
              </FormGroup>
            </FormControl>
            </div>
          )
        })}
        <div>
        {data.categories?.edges.map( ({node}) => {
          const filterName = `category-${node.id}`
          return (
            <FormControl component="fieldset" key={node.id}>
              <FormLabel component="legend">Category</FormLabel>
              <FormGroup>
              <FormControlLabel
                    control={<Checkbox checked={checked[filterName]} onChange={checkHandler} name={filterName} />}
                    label={node.name}
              />
              </FormGroup>
            </FormControl>
          )
        })} 
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default ProductFilters;
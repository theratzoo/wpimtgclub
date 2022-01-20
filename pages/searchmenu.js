import React from 'react'
import Select from "react-select";
import Button from 'react-bootstrap/Button'


const comparisons = [
    { label: "Greater Than", value: 355 },
    { label: "Less Than", value: 54 },
    { label: "Equal To", value: 43 },
  ];
  const types = [
    { label: "Creature", value: 355 },
    { label: "Instant", value: 54 },
    { label: "Sorcery", value: 43 },
    { label: "Artifact", value: 42 },
    { label: "Enchantment", value: 41 },
    { label: "Land", value: 40 },
    { label: "Planeswalker", value: 39 },
  ];
  const colors = [
    { label: "White", value: 355 },
    { label: "Blue", value: 54 },
    { label: "Black", value: 43 },
    { label: "Red", value: 42 },
    { label: "Green", value: 41 },
    { label: "Colorless", value: 40 },
  ];
  const formats = [
    { label: "Standard", value: 355 },
    { label: "Modern", value: 54 },
    { label: "Legacy", value: 43 },
    { label: "Commander", value: 42 },
    { label: "Vintage", value: 41 },
    { label: "Pauper", value: 40 },
    { label: "Pioneer", value: 39 },
  ];

  const sets = [
    { label: "Standard", value: 355 },
    { label: "Modern", value: 54 },
    { label: "Legacy", value: 43 },
    { label: "Commander", value: 42 },
    { label: "Vintage", value: 41 },
    { label: "Pauper", value: 40 },
    { label: "Pioneer", value: 39 },
  ];

  const rarity = [
    { label: "Common", value: 355 },
    { label: "Uncommon", value: 54 },
    { label: "Rare", value: 43 },
    { label: "Mythic", value: 42 },
  ];

export default class SearchMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cmcType:null,
            types:null,
            colors:null,
            formatLegalities:null,
            sets:null,
            rarity:null,
        }
    }

    applyFilters() {
        const handleToUpdate = this.props.handleToUpdate;
        const nameFilter = document.getElementById('name').value
        const oracleTextFilter = document.getElementById('oracleText').value
        const cmcFilter = document.getElementById('cmc').value
        //const exactManaCost = document.getElementById('exactManaCost').value // idk how to format this yet
        handleToUpdate(nameFilter, oracleTextFilter, this.state.cmcType, cmcFilter, this.state.types, this.state.colors,this.state.formatLegalities, this.state.sets, this.state.rarity)
    }
    
    handleChangeCmcType = (cmcType) => {
    this.setState({ cmcType }, () =>
      console.log(`Option selected:`, this.state.cmcType)
    );
  };
  handleChangeTypes = (types) => {
    this.setState({ types }, () =>
      console.log(`Option selected:`, this.state.types)
    );
  };
  handleChangeColors = (colors) => {
    this.setState({ colors }, () =>
      console.log(`Option selected:`, this.state.colors)
    );
  };
  handleChangeFormatLegalities = (formatLegalities) => {
    this.setState({ formatLegalities }, () =>
      console.log(`Option selected:`, this.state.formatLegalities)
    );
  };
  handleChangeSets = (sets) => {
    this.setState({ sets }, () =>
      console.log(`Option selected:`, this.state.sets)
    );
  };
  handleChangeRaritiy = (rarity) => {
    this.setState({ rarity }, () =>
      console.log(`Option selected:`, this.state.rarity)
    );
  };



    render() {
        return (<div>
            <div>
                <h4>Name&nbsp;&nbsp;<input type="text" id="name"></input></h4>
            </div>
            <div>
                <h4>Oracle Text&nbsp;&nbsp;<input type="text" id="oracleText"></input></h4>
            </div>
            
            <div>
                <h4>Converted Mana Cost&nbsp;&nbsp;<div style={{display: "inline-block"}}><Select value={this.state.cmcType} options={comparisons} onChange={this.handleChangeCmcType} /></div>&nbsp;&nbsp;<input type="number" id="cmc"></input></h4>
            </div>
            <div>
                <h4>Types&nbsp;&nbsp;<div style={{display: "inline-block"}}><Select value={this.state.types} style="display:inline" options={types} onChange={this.handleChangeTypes} isMulti /></div></h4>
            </div>
            <div>
                <h4>Colors&nbsp;&nbsp;<div style={{display: "inline-block"}}><Select value={this.state.colors} style="display:inline" options={colors} onChange={this.handleChangeColors} isMulti /></div></h4>
            </div>
            <div>
                <h4>Format Legalities&nbsp;&nbsp;<div style={{display: "inline-block"}}><Select value={this.state.formatLegalities} style="display:inline" options={formats} onChange={this.handleChangeFormatLegalities} isMulti /></div></h4>
            </div>
            <div>
                <h4>Sets&nbsp;&nbsp;<div style={{display: "inline-block"}}><Select value={this.state.sets} style="display:inline" options={sets} onChange={this.handleChangeSets} isMulti /></div></h4>
            </div>
            <div>
                <h4>Rarity&nbsp;&nbsp;<div style={{display: "inline-block"}}><Select value={this.state.rarity} style="display:inline" options={rarity} onChange={this.handleChangeRaritiy} /></div></h4>
            </div>
            <Button className="btn btn-success" onClick={()=>this.applyFilters()}>Apply Filters</Button>
        </div>)
    }


}
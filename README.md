# spotify


        <h2>ID: {this.state.profile.id}</h2>
        <h2>Email: {this.state.profile.email}</h2>
        <h2>Following: </h2>
        {this.state.following.items.map((data) => {
            return <li key={data.id}><p>{data.name}</p></li>
    })}
    <h2>playlist: </h2>
    {this.state.playlist.map((data) => {
    return <Playlist key={data.name} code={this.props.code} id={data.owner.id}
    info={data}/>

    })}
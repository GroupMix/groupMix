<div className="login-form">
<Grid
  textAlign="center"
  style={{ height: '450px' }}
  verticalAlign="middle"
>
  <Grid.Column style={{ maxWidth: 450 }}>
    <Header as="h2" color="green" textAlign="center">
      {displayName}
    </Header>
    <Form onSubmit={handleSubmit} name={name} size="large">
      <Segment stacked style={{ height: '225px' }}>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          type="text"
          name="email"
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          name="pass"
        />

        <Button href="/auth/spotify" color="green" fluid size="large">
        <Icon name="spotify" size="large" color="green" />
          Spotify {displayName}
        </Button>

      </Segment>

    </Form>

  </Grid.Column>
</Grid>
</div>



// <Button style={{ backgroundColor: '#8038AC', color: 'white' }} onClick={() => pausePlaylist()}>Pause</Button>






<Form onSubmit={evt => handleSubmit(name, evt)} name={name} size="large">




<div>
<form onSubmit={handleSubmit} name={name}>
  <div>
    <label htmlFor="email"><small>Email</small></label>
    <input name="email" type="text" />
  </div>
  <div>
    <label htmlFor="password"><small>Password</small></label>
    <input name="password" type="password" />
  </div>
  <div>
    <button type="submit">{displayName}</button>
  </div>
  {error && error.response && <div> {error.response.data} </div>}
</form>
<a href="/auth/spotify">{displayName} with Spotify</a>
</div>


width={6}
, width: '500px'









